import { prisma } from '@/core/database/prisma';

export async function getGarmentDetailAction(identifier: string) {
  try {
    const garment = await prisma.catalogCreation.findFirst({
      where: {
        OR: [{ id: identifier }, { pieceCode: identifier }],
      },
      include: {
        fabric: true,
      },
    });

    if (!garment) return null;

    let parsedImages: string[] = [];
    try {
      parsedImages = JSON.parse(garment.images);
    } catch {
      parsedImages = [garment.images];
    }

    return {
      ...garment,
      imagesList: parsedImages,
    };
  } catch (error) {
    console.error('Error fetching garment detail:', error);
    return null;
  }
}
