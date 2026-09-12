import { prisma } from '@/core/database/prisma';
import { TextileFilterInput } from '@/features/textiles/contracts/textile.dto';

export async function getTextilesAction(filters?: TextileFilterInput) {
  try {
    const whereClause: Record<string, unknown> = {};

    if (filters?.season && filters.season !== 'ALL') {
      whereClause.season = filters.season;
    }
    if (filters?.weavePattern && filters.weavePattern !== 'ALL') {
      whereClause.weavePattern = filters.weavePattern;
    }

    const fabrics = await prisma.fabric.findMany({
      where: whereClause,
      include: {
        creations: {
          select: {
            id: true,
            pieceCode: true,
            title: true,
          },
        },
      },
      orderBy: { code: 'asc' },
    });

    return fabrics.map((f) => ({
      ...f,
      creationsCount: f.creations.length,
    }));
  } catch (error) {
    console.error('Error fetching textiles:', error);
    return [];
  }
}
