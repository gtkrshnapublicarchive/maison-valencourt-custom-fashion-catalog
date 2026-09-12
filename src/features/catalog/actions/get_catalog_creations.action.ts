import { prisma } from '@/core/database/prisma';
import { CatalogFilterInput } from '@/features/catalog/contracts/catalog.dto';

export async function getCatalogCreationsAction(filters?: CatalogFilterInput) {
  try {
    const whereClause: Record<string, unknown> = {};

    if (filters?.demographic && filters.demographic !== 'ALL') {
      whereClause.demographic = filters.demographic;
    }
    if (filters?.garmentType && filters.garmentType !== 'ALL') {
      whereClause.garmentType = filters.garmentType;
    }
    if (filters?.collectionTheme && filters.collectionTheme !== 'ALL') {
      whereClause.collectionTheme = filters.collectionTheme;
    }
    if (filters?.search && filters.search.trim()) {
      const q = filters.search.trim();
      whereClause.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { pieceCode: { contains: q, mode: 'insensitive' } },
        { leadArtisan: { contains: q, mode: 'insensitive' } },
        { conceptStory: { contains: q, mode: 'insensitive' } },
      ];
    }

    const creations = await prisma.catalogCreation.findMany({
      where: whereClause,
      include: {
        fabric: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return creations.map((item) => {
      let parsedImages: string[] = [];
      try {
        parsedImages = JSON.parse(item.images);
      } catch {
        parsedImages = [item.images];
      }

      return {
        ...item,
        imagesList: parsedImages,
      };
    });
  } catch (error) {
    console.error('Error fetching catalog creations:', error);
    return [];
  }
}
