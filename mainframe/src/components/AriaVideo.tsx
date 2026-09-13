import { useCallback, useEffect, useRef } from 'react';

const SENSITIVITY = 0.8;
/** Seeks below this are visually indistinguishable, so treat them as already met. */
const EPSILON = 0.001;
const HAVE_METADATA = 1;

/**
 * Full-screen background clip driven by horizontal mouse travel rather than playback.
 * The source is re-encoded with every frame as a keyframe, so `currentTime` seeks
 * land instantly instead of snapping to the nearest 2-5s GOP boundary.
 */
export default function AriaVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const prevXRef = useRef<number | null>(null);

  const commitSeek = useCallback(() => {
    const video = videoRef.current;
    if (!video || isSeekingRef.current) return;

    const target = targetTimeRef.current;
    if (Math.abs(video.currentTime - target) < EPSILON) return;

    isSeekingRef.current = true;
    video.currentTime = target;
  }, []);

  // Queue the next seek only once the previous one has landed, and only if the
  // target moved in the meantime. Seeking on every mousemove instead floods the
  // decoder and the browser silently drops frames mid-drag.
  const handleSeeked = useCallback(() => {
    isSeekingRef.current = false;
    const video = videoRef.current;
    if (!video) return;
    if (Math.abs(video.currentTime - targetTimeRef.current) > EPSILON) commitSeek();
  }, [commitSeek]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Coarse pointers never fire mousemove, so scrubbing is unreachable there.
    // Play the turn through once at half speed rather than leaving a dead frame.
    if (window.matchMedia('(pointer: coarse)').matches) {
      const playThroughOnce = () => {
        video.playbackRate = 0.5;
        void video.play().catch(() => {
          /* Autoplay refused: the poster frame stays up, which is the intended fallback. */
        });
      };

      if (video.readyState >= HAVE_METADATA) {
        playThroughOnce();
        return;
      }
      video.addEventListener('loadedmetadata', playThroughOnce, { once: true });
      return () => video.removeEventListener('loadedmetadata', playThroughOnce);
    }

    const handleMouseMove = (event: MouseEvent) => {
      const { duration } = video;
      if (!Number.isFinite(duration) || duration <= 0) return;

      // First sample only establishes the origin - there is no delta yet.
      if (prevXRef.current === null) {
        prevXRef.current = event.clientX;
        return;
      }

      const delta = event.clientX - prevXRef.current;
      prevXRef.current = event.clientX;

      const offset = (delta / window.innerWidth) * SENSITIVITY * duration;
      targetTimeRef.current = Math.min(duration, Math.max(0, targetTimeRef.current + offset));
      commitSeek();
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [commitSeek]);

  return (
    <video
      ref={videoRef}
      className="fixed inset-0 z-0 h-full w-full object-cover"
      style={{ objectPosition: '70% center' }}
      src="/video/aria-hero-scrub.mp4"
      poster="/video/aria-poster.jpg"
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      onSeeked={handleSeeked}
    />
  );
}
