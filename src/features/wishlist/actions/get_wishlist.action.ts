'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/actions/auth_options';
import { prisma } from '@/core/database/prisma';
import { WishlistItemSummary } from '@/features/wishlist/contracts/wishlist.dto';

export async function getWishlistAction(): Promise<WishlistItemSummary[]> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return [];
    }

    const items = await prisma.wishlistItem.findMany({
      where: { patronId: session.user.id },
      include: {
        creation: {
          include: {
            fabric: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => {
      let imagesList: string[] = [];
      try {
        imagesList = JSON.parse(item.creation.images);
      } catch {
        imagesList = [item.creation.images];
      }

      return {
        id: item.id,
        createdAt: item.createdAt,
        creation: {
          id: item.creation.id,
          pieceCode: item.creation.pieceCode,
          title: item.creation.title,
          demographic: item.creation.demographic,
          garmentType: item.creation.garmentType,
          leadArtisan: item.creation.leadArtisan,
          valuationAurum: item.creation.valuationAurum,
          availabilityStatus: item.creation.availabilityStatus,
          imagesList,
          fabricName: item.creation.fabric?.name,
        },
      };
    });
  } catch (error) {
    console.error('Error fetching patron wishlist:', error);
    return [];
  }
}
