import { describe, it } from 'node:test';
import assert from 'node:assert';
import { z } from 'zod';

const UpdateProfileSchema = z.object({
  name: z.string().min(2).max(100),
  cityOrRegion: z.string().max(100).optional().nullable(),
});

const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1),
    newPassword: z
      .string()
      .min(8)
      .regex(/[A-Za-z]/)
      .regex(/[0-9]/),
    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'New password and confirmation do not match',
    path: ['confirmPassword'],
  });

describe('Profile Validation Schemas', () => {
  it('should accept valid profile updates', () => {
    const valid = { name: 'Julian Sterling', cityOrRegion: 'Arts District, Aurelia' };
    const parsed = UpdateProfileSchema.safeParse(valid);
    assert.strictEqual(parsed.success, true);
  });

  it('should reject names shorter than 2 characters', () => {
    const invalid = { name: 'J', cityOrRegion: 'Aurelia' };
    const parsed = UpdateProfileSchema.safeParse(invalid);
    assert.strictEqual(parsed.success, false);
  });

  it('should accept valid password change with matching confirmation', () => {
    const valid = {
      currentPassword: 'OldPassword1!',
      newPassword: 'NewSecurePass2026',
      confirmPassword: 'NewSecurePass2026',
    };
    const parsed = ChangePasswordSchema.safeParse(valid);
    assert.strictEqual(parsed.success, true);
  });

  it('should reject password change when confirmation differs', () => {
    const invalid = {
      currentPassword: 'OldPassword1!',
      newPassword: 'NewSecurePass2026',
      confirmPassword: 'DifferentPassword2026',
    };
    const parsed = ChangePasswordSchema.safeParse(invalid);
    assert.strictEqual(parsed.success, false);
  });

  it('should reject new password lacking numbers or letters', () => {
    const noNumbers = {
      currentPassword: 'OldPassword1!',
      newPassword: 'onlylettershere',
      confirmPassword: 'onlylettershere',
    };
    assert.strictEqual(ChangePasswordSchema.safeParse(noNumbers).success, false);
  });
});
