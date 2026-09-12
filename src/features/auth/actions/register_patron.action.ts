'use server';

import { prisma } from '@/core/database/prisma';
import { hashPassword } from '@/core/security/password';
import { sanitizePlainText } from '@/core/security/sanitizer';
import { PatronRegisterSchema, PatronRegisterInput } from '@/features/auth/contracts/auth.dto';

export interface RegisterResult {
  success: boolean;
  error?: string;
  patronId?: string;
}

export async function registerPatronAction(data: PatronRegisterInput): Promise<RegisterResult> {
  try {
    const validated = PatronRegisterSchema.parse(data);

    const cleanEmail = validated.email.toLowerCase().trim();
    const cleanName = sanitizePlainText(validated.name);
    const cleanCity = sanitizePlainText(validated.cityOrRegion);

    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existingUser) {
      return {
        success: false,
        error: 'An account with this email address already exists.',
      };
    }

    const passwordHash = await hashPassword(validated.password);

    const user = await prisma.user.create({
      data: {
        email: cleanEmail,
        name: cleanName,
        passwordHash,
        cityOrRegion: cleanCity,
        role: 'PATRON',
      },
    });

    return {
      success: true,
      patronId: user.id,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Failed to complete registration.' };
  }
}
