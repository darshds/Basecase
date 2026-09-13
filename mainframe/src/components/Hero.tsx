import { useEffect, useRef, useState } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const EMAIL = 'hello@mainframe.co';
const TYPED_TEXT =
  'Glad you stopped in. Good taste tends to find us. Now, what are we building?';
const ACTIONS = [
  'Pitch us an idea',
  'Come work here',
  'Send a brief hello',
  'See how we operate',
];

const PILL_DELAY_MS = 400;
const COPY_RESET_MS = 1600;

const PILL_BASE =
  'inline-flex items-center justify-center rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap transition-colors duration-200';

function CopyIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <rect x="4.1" y="4.1" width="6.8" height="6.8" rx="1.4" />
      <rect x="1.1" y="1.1" width="6.8" height="6.8" rx="1.4" />
    </svg>
  );
}

export default function Hero() {
  const { displayed, done } = useTypewriter(TYPED_TEXT);
  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef<number | undefined>(undefined);

  // Deliberately decoupled from the typewriter: the pills land on a fixed 400ms
  // timer whether or not the sentence has finished typing.
  useEffect(() => {
    const timer = window.setTimeout(() => setPillsVisible(true), PILL_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => () => window.clearTimeout(copyTimerRef.current), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.clearTimeout(copyTimerRef.current);
      copyTimerRef.current = window.setTimeout(() => setCopied(false), COPY_RESET_MS);
    } catch {
      /* Clipboard denied (insecure origin or blocked permission): leave the label alone. */
    }
  };

  return (
    <section className="relative z-[1] h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden">
      {/*
        Mobile-only scrim. At 390px the object-position: 70% crop lands squarely on
        the figure, so the black copy would otherwise sit on the near-black jacket.
        Hidden from md up, where the copy already falls on empty backdrop.
      */}
      <div
        className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-white/85 via-white/45 to-transparent md:hidden pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-xl relative z-10">
        <p
          className="pointer-events-none select-none mb-5 sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.3,
            fontWeight: 400,
            color: '#000',
            filter: 'blur(4px)',
          }}
        >
          Hey there, meet A.R.I.A,
          <br />
          Mainframe's Adaptive Response Interface Agent
        </p>

        <p
          className="text-black mb-5 sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.35,
            fontWeight: 400,
            minHeight: '54px',
          }}
        >
          {displayed}
          {!done && (
            <span
              className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px]"
              style={{ animation: 'blink 1s step-end infinite' }}
            />
          )}
        </p>

        <div
          className="flex flex-wrap gap-y-1"
          style={{
            opacity: pillsVisible ? 1 : 0,
            transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {ACTIONS.map((label) => (
            <button
              key={label}
              type="button"
              className={`${PILL_BASE} bg-white text-black border border-black/10 hover:bg-black hover:text-white`}
            >
              {label}
            </button>
          ))}

          <button
            type="button"
            onClick={handleCopy}
            aria-label={`Copy ${EMAIL} to clipboard`}
            className={`${PILL_BASE} bg-transparent text-white border border-white gap-2 sm:gap-3 hover:bg-white hover:text-black`}
          >
            <span>
              {copied ? (
                'Copied'
              ) : (
                <>
                  Reach us: <span className="underline underline-offset-1">{EMAIL}</span>
                </>
              )}
            </span>
            <CopyIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
