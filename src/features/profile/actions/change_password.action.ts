'use server';

import { getServerSession } from 'next-auth';
import bcrypt from 'bcryptjs';
import { authOptions } from '@/features/auth/actions/auth_options';
import { prisma } from '@/core/database/prisma';
import { ChangePasswordSchema, ChangePasswordInput } from '@/features/profile/contracts/profile.schema';

export interface ChangePasswordResult {
  success: boolean;
  error?: string;
}

export async function changePasswordAction(input: ChangePasswordInput): Promise<ChangePasswordResult> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: 'Authentication required. Please sign in.' };
    }

    const validated = ChangePasswordSchema.parse(input);

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, passwordHash: true },
    });

    if (!user) {
      return { success: false, error: 'User record not found.' };
    }

    const isMatch = await bcrypt.compare(validated.currentPassword, user.passwordHash);
    if (!isMatch) {
      return { success: false, error: 'Current password provided is incorrect.' };
    }

    const newHash = await bcrypt.hash(validated.newPassword, 12);

    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: newHash },
    });

    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Failed to update security credentials' };
  }
}
