'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/actions/auth_options';
import { prisma } from '@/core/database/prisma';

export async function getPatronTestimonialsAction() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return [];
  }

  try {
    const items = await prisma.testimonial.findMany({
      where: {
        patronId: session.user.id,
        status: { not: 'DELETED' },
      },
      orderBy: { createdAt: 'desc' },
    });

    return items;
  } catch (error) {
    console.error('Error fetching patron testimonials:', error);
    return [];
  }
}
