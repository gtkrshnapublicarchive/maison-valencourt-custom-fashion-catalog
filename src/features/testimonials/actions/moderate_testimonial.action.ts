'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/actions/auth_options';
import { prisma } from '@/core/database/prisma';
import { sanitizePlainText } from '@/core/security/sanitizer';

export async function approveTestimonialAction(testimonialId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized administrative action' };
  }

  try {
    const updated = await prisma.testimonial.update({
      where: { id: testimonialId },
      data: {
        status: 'APPROVED',
        reviewedAt: new Date(),
        reviewedById: session.user.id,
      },
    });

    return { success: true, testimonial: updated };
  } catch (error) {
    console.error('Error approving testimonial:', error);
    return { success: false, error: 'Failed to approve testimonial' };
  }
}

export async function rejectTestimonialAction(testimonialId: string, reason: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized administrative action' };
  }

  try {
    const cleanReason = sanitizePlainText(reason);
    const updated = await prisma.testimonial.update({
      where: { id: testimonialId },
      data: {
        status: 'REJECTED',
        rejectionReason: cleanReason,
        reviewedAt: new Date(),
        reviewedById: session.user.id,
      },
    });

    return { success: true, testimonial: updated };
  } catch (error) {
    console.error('Error rejecting testimonial:', error);
    return { success: false, error: 'Failed to reject testimonial' };
  }
}

export async function confirmDeletionAction(testimonialId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized administrative action' };
  }

  try {
    const updated = await prisma.testimonial.update({
      where: { id: testimonialId },
      data: {
        status: 'DELETED',
        content: '[Testimonial retracted by authenticated patron request]',
        reviewedAt: new Date(),
        reviewedById: session.user.id,
      },
    });

    return { success: true, testimonial: updated };
  } catch (error) {
    console.error('Error confirming deletion:', error);
    return { success: false, error: 'Failed to confirm deletion' };
  }
}
