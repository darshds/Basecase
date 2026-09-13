'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Scroll-driven descent through a recursive structure.
 *
 * The section is tall and its canvas is sticky, so vertical scroll is remapped
 * into camera travel: you fly through shell after shell until you reach the
 * solid core. The page's own scrollbar is the timeline.
 *
 * Scroll progress is written into a mutable ref and read inside `useFrame`
 * rather than held in React state. R3F renders on its own loop, so putting
 * scroll position in state would re-render the tree on every scroll event for
 * no benefit.
 */

const SHELLS = 11;
const RATIO = 0.74;
const OUTER = 22;
/** Camera travel, far end to the core. */
const Z_START = 26;
/* Stop in front of the core, not inside it: arriving at the base case reads
   better than being swallowed by it, and the copy keeps its contrast. */
const Z_END = 3.6;

function Shell({ index, size, progress, colors }) {
  const ref = useRef();

  const geometry = useMemo(() => {
    const box = new THREE.BoxGeometry(size, size, size);
    const edges = new THREE.EdgesGeometry(box);
    box.dispose();
    return edges;
  }, [size]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    const mesh = ref.current;
    if (!mesh) return;

    const p = progress.current;
    const camZ = THREE.MathUtils.lerp(Z_START, Z_END, p);
    // Half-extent is where the camera crosses this shell's front face.
    const half = size / 2;

    // Fade a shell out as the camera passes through it, so you are not looking
    // at wireframe behind your own head.
    const d = camZ - half;
    const fade = THREE.MathUtils.clamp(d / 3.5, 0, 1);
    mesh.material.opacity = fade * (0.28 + (index / SHELLS) * 0.5);
    mesh.visible = fade > 0.02;

    const dir = index % 2 === 0 ? 1 : -1;
    mesh.rotation.y += delta * 0.05 * dir;
    mesh.rotation.x += delta * 0.03 * dir;
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color={colors.line} transparent opacity={0.4} depthWrite={false} />
    </lineSegments>
  );
}

/** The base case. Only resolves into view at the end of the descent. */
function Core({ size, progress, colors }) {
  const ref = useRef();

  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    const p = progress.current;
    const t = state.clock.elapsedTime;

    // Stays dormant until the descent is nearly complete, then blooms.
    const wake = THREE.MathUtils.clamp((p - 0.62) / 0.38, 0, 1);
    m.scale.setScalar(size * (0.35 + wake * 0.9) * (1 + Math.sin(t * 2) * 0.03 * wake));

    // Drift clear of the copy as it solidifies. The tunnel stays centred while
    // descending (thin wireframe reads fine behind text); only the opaque core
    // needs to move out of the way.
    m.position.x = wake * 3.1;
    m.position.y = wake * -0.35;
    m.rotation.y += 0.006;
    m.rotation.x += 0.003;
    m.material.emissiveIntensity = 0.25 + wake * 1.5;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={colors.line}
        emissive={colors.line}
        emissiveIntensity={0.3}
        roughness={0.3}
        metalness={0.15}
      />
    </mesh>
  );
}

function Descent({ progress, colors }) {
  const { camera } = useThree();

  const shells = useMemo(
    () => Array.from({ length: SHELLS }, (_, i) => ({ i, size: OUTER * RATIO ** i })),
    []
  );

  useFrame((state, delta) => {
    const p = progress.current;
    const target = THREE.MathUtils.lerp(Z_START, Z_END, p);
    // Damped rather than snapped, so a flicked scroll wheel still reads smooth.
    camera.position.z += (target - camera.position.z) * Math.min(1, delta * 6);

    // Slight drift toward the pointer keeps it feeling hand-held, not on rails.
    camera.position.x += (state.pointer.x * 0.9 - camera.position.x) * Math.min(1, delta * 2);
    camera.position.y += (state.pointer.y * 0.6 - camera.position.y) * Math.min(1, delta * 2);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {shells.map(({ i, size }) => (
        <Shell key={i} index={i} size={size} progress={progress} colors={colors} />
      ))}
      <Core size={OUTER * RATIO ** SHELLS * 2.2} progress={progress} colors={colors} />
    </>
  );
}

export default function RecursionScroll({ progress }) {
  const [colors, setColors] = useState({ line: '#1D33E0' });

  useEffect(() => {
    const read = () => {
      const css = getComputedStyle(document.documentElement);
      setColors({ line: (css.getPropertyValue('--signal') || '#1D33E0').trim() });
    };
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => mo.disconnect();
  }, []);

  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, Z_START], fov: 55, near: 0.1, far: 120 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 6, 8]} intensity={1.5} />
      <Descent progress={progress} colors={colors} />
    </Canvas>
  );
}
