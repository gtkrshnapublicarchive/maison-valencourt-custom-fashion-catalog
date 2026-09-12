'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/actions/auth_options';
import { prisma } from '@/core/database/prisma';

export async function toggleWishlistAction(creationId: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: 'Authentication required' };
    }

    const patronId = session.user.id;

    const existing = await prisma.wishlistItem.findUnique({
      where: {
        patronId_creationId: {
          patronId,
          creationId,
        },
      },
    });

    if (existing) {
      await prisma.wishlistItem.delete({
        where: { id: existing.id },
      });
      return { success: true, isSaved: false };
    } else {
      await prisma.wishlistItem.create({
        data: {
          patronId,
          creationId,
        },
      });
      return { success: true, isSaved: true };
    }
  } catch (error) {
    console.error('Error toggling wishlist item:', error);
    return { success: false, error: 'Failed to update wishlist' };
  }
}
