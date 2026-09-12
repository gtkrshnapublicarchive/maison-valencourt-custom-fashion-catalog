import { z } from 'zod';

export const PatronRegisterSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s\-']+$/, 'Name can only contain letters, spaces, and hyphens'),
  email: z.string().email('Please provide a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Za-z]/, 'Password must contain at least one letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  cityOrRegion: z.string().min(2, 'City or Region is required').max(50),
});

export type PatronRegisterInput = z.infer<typeof PatronRegisterSchema>;

export const PatronLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type PatronLoginInput = z.infer<typeof PatronLoginSchema>;

export const AdminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type AdminLoginInput = z.infer<typeof AdminLoginSchema>;
