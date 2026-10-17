import 'server-only';
import { z } from 'zod';

const schema = z.object({
  STAFF_PHONE: z.string().regex(/^\d{9}$/, 'must be 9 digits'),
  STAFF_PASSWORD: z.string().min(8, 'must be at least 8 characters'),
});

let cached;

export function getEnv() {
  if (cached) return cached;

  const result = schema.safeParse({
    STAFF_PHONE: process.env.STAFF_PHONE,
    STAFF_PASSWORD:
      process.env.STAFF_PASSWORD ??
      (process.env.NODE_ENV === 'production' ? undefined : 'kitchen123'),
  });

  if (!result.success) {
    const lines = result.error.issues.map((issue) => `  ${issue.path[0]} ${issue.message}`);
    throw new Error(`Bad environment. See .env.example\n${lines.join('\n')}`);
  }

  cached = result.data;
  return cached;
}
