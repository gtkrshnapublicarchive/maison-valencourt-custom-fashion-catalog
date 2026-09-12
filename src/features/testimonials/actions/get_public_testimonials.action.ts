import { prisma } from '@/core/database/prisma';

export async function getPublicTestimonialsAction() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: {
        status: 'APPROVED',
      },
      orderBy: { reviewedAt: 'desc' },
    });

    return testimonials;
  } catch (error) {
    console.error('Error fetching public testimonials:', error);
    return [];
  }
}
