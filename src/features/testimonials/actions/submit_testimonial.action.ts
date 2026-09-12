'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/actions/auth_options';
import { prisma } from '@/core/database/prisma';
import { sanitizePlainText } from '@/core/security/sanitizer';
import {
  TestimonialSubmissionSchema,
  TestimonialSubmissionInput,
} from '@/features/testimonials/contracts/testimonial.schema';

export interface SubmitTestimonialResult {
  success: boolean;
  error?: string;
  testimonialId?: string;
}

export async function submitTestimonialAction(
  data: TestimonialSubmissionInput
): Promise<SubmitTestimonialResult> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== 'PATRON') {
      return { success: false, error: 'Authenticated Patron session required to submit testimonials.' };
    }

    const patronId = session.user.id;

    // Check 30-day rate limit for this patron account
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recentSubmission = await prisma.testimonial.findFirst({
      where: {
        patronId,
        createdAt: { gte: thirtyDaysAgo },
        status: { not: 'DELETED' },
      },
    });

    if (recentSubmission) {
      return {
        success: false,
        error: 'Atelier policy restricts patrons to one review submission every 30 days.',
      };
    }

    const validated = TestimonialSubmissionSchema.parse(data);

    const cleanAuthor = sanitizePlainText(validated.authorName);
    const cleanCity = sanitizePlainText(validated.cityOrRegion);
    const cleanCreation = validated.creationReferenced ? sanitizePlainText(validated.creationReferenced) : null;
    const cleanContent = sanitizePlainText(validated.content);

    const testimonial = await prisma.testimonial.create({
      data: {
        patronId,
        authorName: cleanAuthor,
        cityOrRegion: cleanCity,
        creationReferenced: cleanCreation,
        rating: validated.rating,
        content: cleanContent,
        status: 'PENDING_REVIEW',
      },
    });

    return {
      success: true,
      testimonialId: testimonial.id,
    };
  } catch (error: unknown) {
    console.error('Error submitting testimonial:', error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Failed to record sartorial testimonial' };
  }
}
