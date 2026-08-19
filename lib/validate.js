export const MESSAGES = {
  name: 'Add your name so we know who to reply to.',
  email: "Check the email address; we can't reply without it.",
  services: 'Pick at least one service so we can route this properly.',
  message: 'A sentence or two is enough; we just need somewhere to start.',
};

export function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v || '').trim());
}

/** Shared by the client form and the API route, so both reject the same input. */
export function validateBrief(body) {
  const errors = {};
  if (!String(body.name || '').trim()) errors.name = MESSAGES.name;
  if (!isEmail(body.email)) errors.email = MESSAGES.email;
  if (!Array.isArray(body.services) || body.services.length === 0) errors.services = MESSAGES.services;
  if (String(body.message || '').trim().length < 5) errors.message = MESSAGES.message;
  return errors;
}

export function makeRef(date = new Date()) {
  const stamp =
    date.getFullYear().toString() +
    String(date.getMonth() + 1).padStart(2, '0') +
    String(date.getDate()).padStart(2, '0');
  const abc = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 4; i++) rand += abc[Math.floor(Math.random() * abc.length)];
  return 'BC-' + stamp + '-' + rand;
}

export function clean(v, max = 2000) {
  return String(v == null ? '' : v).trim().slice(0, max);
}
