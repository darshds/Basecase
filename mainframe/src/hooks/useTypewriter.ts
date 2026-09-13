import { useEffect, useState } from 'react';

const DEFAULT_SPEED_MS = 38;
const DEFAULT_START_DELAY_MS = 600;

export function useTypewriter(
  text: string,
  speed: number = DEFAULT_SPEED_MS,
  startDelay: number = DEFAULT_START_DELAY_MS,
) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);

    let interval: number | undefined;

    const timeout = window.setTimeout(() => {
      let index = 0;
      interval = window.setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          window.clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
