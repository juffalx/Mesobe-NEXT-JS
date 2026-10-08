import 'server-only';
import { cookies } from 'next/headers';

const sessions = (globalThis.mesobSessions ??= new Map());

export async function createSession(user) {
  const id = crypto.randomUUID();
  sessions.set(id, user);
  const store = await cookies();
  store.set('session', id, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getSession() {
  const store = await cookies();
  const id = store.get('session')?.value;
  return id ? sessions.get(id) || null : null;
}

export async function destroySession() {
  const store = await cookies();
  const id = store.get('session')?.value;
  if (id) sessions.delete(id);
  store.delete('session');
}
