'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/actions/auth_options';
import { prisma } from '@/core/database/prisma';
import { sanitizePlainText } from '@/core/security/sanitizer';
import { DeletionRequestSchema, DeletionRequestInput } from '@/features/testimonials/contracts/testimonial.schema';

export async function requestDeletionAction(data: DeletionRequestInput) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: 'Authentication required' };
    }

    const validated = DeletionRequestSchema.parse(data);

    const testimonial = await prisma.testimonial.findUnique({
      where: { id: validated.testimonialId },
    });

    if (!testimonial || testimonial.patronId !== session.user.id) {
      return { success: false, error: 'Testimonial not found or unauthorized' };
    }

    if (testimonial.status !== 'APPROVED') {
      return { success: false, error: 'Only published approved testimonials can request deletion.' };
    }

    const cleanReason = sanitizePlainText(validated.reason);

    await prisma.testimonial.update({
      where: { id: validated.testimonialId },
      data: {
        status: 'DELETION_PENDING',
        deletionReason: cleanReason,
      },
    });

    return { success: true };
  } catch (error: unknown) {
    console.error('Error submitting deletion request:', error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Failed to submit deletion request' };
  }
}
