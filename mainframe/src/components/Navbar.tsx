import { useState } from 'react';

const NAV_LINKS = ['Labs', 'Studio', 'Openings', 'Shop'];
const CTA_LABEL = 'Get in touch';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 z-10 w-full flex flex-row justify-between items-center px-5 sm:px-8 py-4 sm:py-5">
        <div className="flex flex-row items-center gap-3">
          <span
            className="text-[21px] sm:text-[26px] tracking-tight text-black"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Mainframe®
          </span>
          <span
            className="text-[25px] sm:text-[30px] text-black select-none"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            ✳︎
          </span>
        </div>

        <nav className="hidden md:flex flex-row text-[23px] text-black">
          {NAV_LINKS.map((label, index) => (
            <span key={label}>
              <a href="#" className="hover:opacity-60 transition-opacity">
                {label}
              </a>
              {index < NAV_LINKS.length - 1 && <span>,&nbsp;</span>}
            </span>
          ))}
        </nav>

        <a
          href="#"
          className="hidden md:inline text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          {CTA_LABEL}
        </a>

        <button
          type="button"
          className="flex md:hidden flex-col gap-[5px]"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span
            className="w-6 h-[2px] bg-black transition-transform duration-300"
            style={{ transform: isOpen ? 'translateY(7px) rotate(45deg)' : 'none' }}
          />
          <span
            className="w-6 h-[2px] bg-black transition-opacity duration-300"
            style={{ opacity: isOpen ? 0 : 1 }}
          />
          <span
            className="w-6 h-[2px] bg-black transition-transform duration-300"
            style={{ transform: isOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }}
          />
        </button>
      </header>

      <div
        className="fixed inset-0 z-[9] md:hidden flex flex-col justify-center items-start px-8 gap-8 bg-white/95 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
        aria-hidden={!isOpen}
      >
        {NAV_LINKS.map((label) => (
          <a
            key={label}
            href="#"
            className="text-[32px] font-medium text-black"
            onClick={() => setIsOpen(false)}
          >
            {label}
          </a>
        ))}
        <a
          href="#"
          className="text-[32px] font-medium text-black underline underline-offset-2"
          onClick={() => setIsOpen(false)}
        >
          {CTA_LABEL}
        </a>
      </div>
    </>
  );
}
