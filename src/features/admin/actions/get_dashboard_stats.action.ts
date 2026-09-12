'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/actions/auth_options';
import { prisma } from '@/core/database/prisma';
import { DashboardStats } from '@/features/admin/contracts/admin.dto';

export async function getDashboardStatsAction(): Promise<DashboardStats> {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized administrative access');
  }

  const [
    totalCreations,
    availableCreations,
    pendingTestimonials,
    approvedTestimonials,
    deletionPendingTestimonials,
    newInquiries,
    totalPatrons,
  ] = await Promise.all([
    prisma.catalogCreation.count(),
    prisma.catalogCreation.count({ where: { availabilityStatus: 'AVAILABLE' } }),
    prisma.testimonial.count({ where: { status: 'PENDING_REVIEW' } }),
    prisma.testimonial.count({ where: { status: 'APPROVED' } }),
    prisma.testimonial.count({ where: { status: 'DELETION_PENDING' } }),
    prisma.viewingInquiry.count({ where: { status: 'NEW' } }),
    prisma.user.count({ where: { role: 'PATRON' } }),
  ]);

  return {
    totalCreations,
    availableCreations,
    pendingTestimonials,
    approvedTestimonials,
    deletionPendingTestimonials,
    newInquiries,
    totalPatrons,
  };
}
