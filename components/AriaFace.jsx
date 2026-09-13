'use client';

import { useCallback, useEffect, useRef } from 'react';

/* Fraction of the clip covered by one full-width sweep of the mouse. */
const SENSITIVITY = 0.8;
/* Seeks below this are visually identical, so treat them as already satisfied. */
const EPSILON = 0.001;
const HAVE_METADATA = 1;
/* Fallback delay when the browser has no requestIdleCallback (Safari). */
const IDLE_FALLBACK_MS = 900;

/**
 * A.R.I.A. , the Basecase interface agent.
 *
 * Sits behind the hero copy as part of the page rather than as an embedded
 * panel: the clip is graded to the paper tone and its edges are dissolved by a
 * radial mask in CSS. It never autoplays on pointer devices , horizontal mouse
 * travel drives `currentTime` instead. The source is re-encoded with every
 * frame as a keyframe, so seeks land exactly rather than snapping to the
 * nearest GOP boundary.
 *
 * The clip is decorative, so it is kept out of the critical path: it starts at
 * `preload="none"` behind its poster and only begins downloading once the page
 * has loaded and the main thread is idle.
 */
export default function AriaFace() {
  const videoRef = useRef(null);
  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const prevXRef = useRef(null);

  // Defer the download until after load + idle so it never competes with the
  // document, CSS or fonts for bandwidth on first paint.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    let cancelled = false;
    let idleId;
    let timeoutId;

    const startLoad = () => {
      if (cancelled) return;
      video.preload = 'auto';
      video.load();
    };

    const schedule = () => {
      if (cancelled) return;
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(startLoad, { timeout: 2500 });
      } else {
        timeoutId = window.setTimeout(startLoad, IDLE_FALLBACK_MS);
      }
    };

    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('load', schedule);
      if (idleId !== undefined && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  // Progressive download is contiguous from 0, so the first buffered range's
  // end is how far we can seek without stalling. Clamping to it lets the scrub
  // work on the part that has arrived instead of staying dead until the whole
  // file lands , which matters most on slow connections.
  const maxSeekable = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.buffered.length) return 0;
    const duration = Number.isFinite(video.duration) ? video.duration : 0;
    return Math.min(duration || video.buffered.end(0), video.buffered.end(0));
  }, []);

  const commitSeek = useCallback(() => {
    const video = videoRef.current;
    if (!video || isSeekingRef.current) return;

    const target = targetTimeRef.current;
    if (Math.abs(video.currentTime - target) < EPSILON) return;

    isSeekingRef.current = true;
    video.currentTime = target;
  }, []);

  // Queue the next seek only once the previous one lands, and only if the target
  // moved meanwhile. Seeking on every mousemove floods the decoder and the
  // browser silently drops frames mid-drag.
  const handleSeeked = useCallback(() => {
    isSeekingRef.current = false;
    const video = videoRef.current;
    if (!video) return;
    if (Math.abs(video.currentTime - targetTimeRef.current) > EPSILON) commitSeek();
  }, [commitSeek]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    // Reduced motion: hold the still frame rather than animating anything.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    // Coarse pointers never fire mousemove, so scrubbing is unreachable there.
    // Play the turn through once at half speed instead of showing a dead frame.
    if (window.matchMedia('(pointer: coarse)').matches) {
      const playThroughOnce = () => {
        video.playbackRate = 0.5;
        video.play().catch(() => {
          /* Autoplay refused , the poster frame stays up, which is the fallback. */
        });
      };

      if (video.readyState >= HAVE_METADATA) {
        playThroughOnce();
        return undefined;
      }
      video.addEventListener('loadedmetadata', playThroughOnce, { once: true });
      return () => video.removeEventListener('loadedmetadata', playThroughOnce);
    }

    const handleMouseMove = (event) => {
      const { duration } = video;
      // No-ops until the deferred load has produced metadata.
      if (!Number.isFinite(duration) || duration <= 0) return;

      // The first sample only establishes an origin , there is no delta yet.
      if (prevXRef.current === null) {
        prevXRef.current = event.clientX;
        return;
      }

      const delta = event.clientX - prevXRef.current;
      prevXRef.current = event.clientX;

      const limit = maxSeekable();
      if (limit <= 0) return;

      const offset = (delta / window.innerWidth) * SENSITIVITY * duration;
      targetTimeRef.current = Math.min(limit, Math.max(0, targetTimeRef.current + offset));
      commitSeek();
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [commitSeek, maxSeekable]);

  return (
    <div className="aria-face" aria-hidden="true">
      <video
        ref={videoRef}
        className="aria-face-video"
        src="/video/aria-hero-scrub.mp4"
        poster="/video/aria-poster.webp"
        muted
        playsInline
        preload="none"
        onSeeked={handleSeeked}
      />
    </div>
  );
}
