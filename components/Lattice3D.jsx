'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * WebGL recursion lattice.
 *
 * Nested wireframe cubes shrinking toward a solid centre: the recursive call
 * stack resolving into its base case. Each shell counter-rotates against its
 * parent so the structure reads as depth rather than a flat outline.
 *
 * Rendered through a transparent canvas so the page background shows through
 * and the whole thing themes with the rest of the site.
 */

const SHELLS = 6;
/** Each shell is this fraction of its parent. */
const RATIO = 0.68;

function useThemeColors() {
  const [colors, setColors] = useState({ line: '#1D33E0', core: '#0C110F', dim: 0.22 });

  useEffect(() => {
    const read = () => {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark';
      const css = getComputedStyle(document.documentElement);
      setColors({
        line: (css.getPropertyValue('--signal') || '#1D33E0').trim(),
        core: (css.getPropertyValue('--ink') || '#0C110F').trim(),
        dim: dark ? 0.34 : 0.22,
      });
    };
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => mo.disconnect();
  }, []);

  return colors;
}

function Shell({ index, size, colors }) {
  const ref = useRef();
  const dir = index % 2 === 0 ? 1 : -1;

  // Edges only: a wireframe box, not a triangulated one, so the silhouette
  // stays clean instead of showing diagonals across each face.
  const geometry = useMemo(() => {
    const box = new THREE.BoxGeometry(size, size, size);
    const edges = new THREE.EdgesGeometry(box);
    box.dispose();
    return edges;
  }, [size]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    const g = ref.current;
    if (!g) return;
    const speed = 0.09 + index * 0.035;
    g.rotation.x += delta * speed * dir * 0.6;
    g.rotation.y += delta * speed * dir;
  });

  const opacity = 0.25 + (index / SHELLS) * 0.6;

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial
        color={colors.line}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </lineSegments>
  );
}

/** The base case: the innermost call that finally returns something solid. */
function Core({ size, colors }) {
  const ref = useRef();
  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    const pulse = 1 + Math.sin(t * 1.4) * 0.06;
    m.scale.setScalar(pulse);
    m.rotation.y += 0.004;
    m.rotation.x += 0.002;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial
        color={colors.line}
        emissive={colors.line}
        emissiveIntensity={0.55}
        roughness={0.35}
        metalness={0.1}
      />
    </mesh>
  );
}

function Rig({ colors }) {
  const group = useRef();
  const { viewport } = useThree();

  // Pointer-follow, damped. The group leans toward the cursor rather than
  // snapping, so the parallax reads as weight instead of jitter.
  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const px = (state.pointer.x * viewport.width) / 14;
    const py = (state.pointer.y * viewport.height) / 14;
    g.rotation.y += (px * 0.25 - g.rotation.y) * Math.min(1, delta * 2.2);
    g.rotation.x += (-py * 0.25 - g.rotation.x) * Math.min(1, delta * 2.2);
  });

  const shells = useMemo(
    () => Array.from({ length: SHELLS }, (_, i) => ({ i, size: 2.6 * RATIO ** i })),
    []
  );

  return (
    <group ref={group}>
      {shells.map(({ i, size }) => (
        <Shell key={i} index={i} size={size} colors={colors} />
      ))}
      <Core size={2.6 * RATIO ** SHELLS} colors={colors} />
    </group>
  );
}

export default function Lattice3D() {
  const colors = useThemeColors();
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  return (
    <Canvas
      // Cap DPR: a 3x retina canvas costs 9x the fragments for no visible gain
      // on a wireframe.
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      // Reduced motion still renders the structure, it just stops animating.
      frameloop={reduced ? 'demand' : 'always'}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <Rig colors={colors} />
    </Canvas>
  );
}
