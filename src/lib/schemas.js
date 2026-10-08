import { z } from 'zod';

const mobile = z.string().regex(/^\d{9,10}$/, 'Enter a valid 9–10 digit mobile number');

export const loginSchema = z.object({
  phone: z.string().regex(/^\d{9,10}$/, 'Enter a valid 9–10 digit Ethiopian mobile number.'),
  password: z.string().min(4, 'Password must be at least 4 characters.'),
});

export const signupSchema = z
  .object({
    name: z.string().trim().min(3, 'Please enter your full name'),
    phone: z.string().regex(/^\d{9}$/, 'Enter a 9-digit mobile number (e.g., 912345678)'),
    email: z.email('Enter a valid email address'),
    password: z.string().min(8, 'Minimum 8 characters'),
    confirm: z.string(),
    pref: z.string(),
    terms: z.boolean().refine((value) => value, 'You must agree to the Hospitality Terms'),
  })
  .refine((data) => data.confirm === data.password, {
    path: ['confirm'],
    message: 'Passwords do not match',
  });

export const checkoutFields = z.object({
  name: z.string().trim().min(2, 'Recipient name is required'),
  phone: mobile,
  email: z.email('Enter a valid email for the digital receipt'),
  subcity: z.string().min(1),
  street: z.string().trim().min(5, 'Enter your street, building and flat number'),
  landmark: z.string().trim().min(3, 'Add a landmark or gate instruction'),
  timing: z.enum(['immediate', 'schedule']),
  scheduleTime: z.string().optional(),
  payment: z.enum(['telebirr', 'cbe', 'cash', 'amole']),
  telebirrPhone: z.string().optional(),
});

export function checkoutRules(data, ctx) {
  if (data.timing === 'schedule' && !data.scheduleTime?.trim()) {
    ctx.addIssue({
      code: 'custom',
      path: ['scheduleTime'],
      message: 'Choose a dispatch time',
    });
  }
  if (data.payment === 'telebirr' && !/^\d{9,10}$/.test(data.telebirrPhone || '')) {
    ctx.addIssue({
      code: 'custom',
      path: ['telebirrPhone'],
      message: 'Enter a valid 9–10 digit Telebirr number',
    });
  }
}

export const checkoutSchema = checkoutFields.superRefine(checkoutRules);

export const lineSchema = z.object({
  id: z.string().min(1),
  option: z.string().nullable(),
  optionPrice: z.number().int().min(0).max(200),
  qty: z.number().int().min(1).max(50),
});

export const orderSchema = z
  .object({
    ...checkoutFields.shape,
    lines: z.array(lineSchema).min(1, 'Your mesob is empty').max(30),
    coupon: z.string().nullable(),
  })
  .superRefine(checkoutRules);
