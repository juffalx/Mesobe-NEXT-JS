import 'server-only';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

const users = (globalThis.mesobUsers ??= new Map());

function hashPassword(password) {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  return `${salt.toString('hex')}:${hash.toString('hex')}`;
}

function samePassword(password, stored) {
  const [salt, hash] = stored.split(':');
  const test = scryptSync(password, Buffer.from(salt, 'hex'), 64);
  return timingSafeEqual(test, Buffer.from(hash, 'hex'));
}

function publicUser({ name, phone, email, role }) {
  return { name, phone, email, role };
}

export function addUser({ name, phone, email, password, role = 'customer' }) {
  if (users.has(phone)) return null;
  const user = { name, phone, email, role, passwordHash: hashPassword(password) };
  users.set(phone, user);
  return publicUser(user);
}

export function checkUser(phone, password) {
  const user = users.get(phone);
  if (!user || !samePassword(password, user.passwordHash)) return null;
  return publicUser(user);
}

if (!users.has('900000001')) {
  addUser({
    name: 'Kitchen Staff',
    phone: '900000001',
    email: 'kitchen@mesob.house',
    password: 'kitchen123',
    role: 'staff',
  });
}
