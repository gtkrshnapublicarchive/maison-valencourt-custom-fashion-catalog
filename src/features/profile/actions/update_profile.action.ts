'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/actions/auth_options';
import { prisma } from '@/core/database/prisma';
import { sanitizePlainText } from '@/core/security/sanitizer';
import { UpdateProfileSchema, UpdateProfileInput } from '@/features/profile/contracts/profile.schema';

export interface UpdateProfileResult {
  success: boolean;
  error?: string;
  name?: string;
  cityOrRegion?: string | null;
}

export async function updateProfileAction(input: UpdateProfileInput): Promise<UpdateProfileResult> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: 'Authentication required. Please sign in.' };
    }

    const validated = UpdateProfileSchema.parse(input);
    const cleanName = sanitizePlainText(validated.name);
    const cleanCity = validated.cityOrRegion ? sanitizePlainText(validated.cityOrRegion) : null;

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: cleanName,
        cityOrRegion: cleanCity,
      },
      select: {
        name: true,
        cityOrRegion: true,
      },
    });

    return {
      success: true,
      name: updatedUser.name,
      cityOrRegion: updatedUser.cityOrRegion,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Failed to update profile attributes' };
  }
}
