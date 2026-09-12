'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/actions/auth_options';
import { prisma } from '@/core/database/prisma';

export async function removeWishlistAction(wishlistItemId: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: 'Authentication required' };
    }

    const item = await prisma.wishlistItem.findUnique({
      where: { id: wishlistItemId },
    });

    if (!item || item.patronId !== session.user.id) {
      return { success: false, error: 'Item not found or unauthorized' };
    }

    await prisma.wishlistItem.delete({
      where: { id: wishlistItemId },
    });

    return { success: true };
  } catch (error) {
    console.error('Error removing wishlist item:', error);
    return { success: false, error: 'Failed to remove from wishlist' };
  }
}
