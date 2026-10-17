import 'server-only';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { getEnv } from './env';

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

function insertUser({ name, phone, email, password, role = 'customer' }) {
  if (users.has(phone)) return null;
  const user = { name, phone, email, role, passwordHash: hashPassword(password) };
  users.set(phone, user);
  return publicUser(user);
}

function seedStaff() {
  const { STAFF_PHONE, STAFF_PASSWORD } = getEnv();
  if (users.has(STAFF_PHONE)) return;
  insertUser({
    name: 'Kitchen Staff',
    phone: STAFF_PHONE,
    email: 'kitchen@mesob.house',
    password: STAFF_PASSWORD,
    role: 'staff',
  });
}

export function addUser(data) {
  seedStaff();
  return insertUser(data);
}

export function checkUser(phone, password) {
  seedStaff();
  const user = users.get(phone);
  if (!user || !samePassword(password, user.passwordHash)) return null;
  return publicUser(user);
}
