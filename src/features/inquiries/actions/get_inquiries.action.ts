'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/actions/auth_options';
import { prisma } from '@/core/database/prisma';
import { ViewingInquirySummary } from '@/features/inquiries/contracts/inquiry.dto';

export async function getInquiriesAction(): Promise<ViewingInquirySummary[]> {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized administrative access');
  }

  const inquiries = await prisma.viewingInquiry.findMany({
    include: {
      creation: {
        select: {
          id: true,
          pieceCode: true,
          title: true,
        },
      },
      patron: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return inquiries;
}
