'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/actions/auth_options';
import { prisma } from '@/core/database/prisma';
import { sanitizePlainText } from '@/core/security/sanitizer';
import { ViewingInquirySchema, ViewingInquiryInput } from '@/features/inquiries/contracts/inquiry.schema';

export interface SubmitInquiryResult {
  success: boolean;
  error?: string;
  inquiryId?: string;
}

export async function submitInquiryAction(data: ViewingInquiryInput): Promise<SubmitInquiryResult> {
  try {
    const validated = ViewingInquirySchema.parse(data);
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return {
        success: false,
        error: 'Authentication required. Please sign in as an authenticated patron to book a salon viewing appointment.',
      };
    }

    let creationIdToLink: string | null = null;
    if (validated.creationId && validated.creationId.trim()) {
      creationIdToLink = validated.creationId.trim();
    } else if (validated.pieceCode && validated.pieceCode.trim()) {
      const foundCreation = await prisma.catalogCreation.findUnique({
        where: { pieceCode: validated.pieceCode.trim() },
      });
      if (foundCreation) {
        creationIdToLink = foundCreation.id;
      }
    }

    const cleanGuestName = sanitizePlainText(validated.guestName);
    const cleanGuestEmail = validated.guestEmail.toLowerCase().trim();
    const cleanPhone = validated.guestPhone ? sanitizePlainText(validated.guestPhone) : null;
    const cleanNotes = validated.fittingNotes ? sanitizePlainText(validated.fittingNotes) : null;

    const inquiry = await prisma.viewingInquiry.create({
      data: {
        guestName: cleanGuestName,
        guestEmail: cleanGuestEmail,
        guestPhone: cleanPhone,
        preferredDate: validated.preferredDate,
        preferredTimeSlot: validated.preferredTimeSlot,
        fittingNotes: cleanNotes,
        creationId: creationIdToLink,
        patronId: session.user.id,
        status: 'NEW',
      },
    });

    return {
      success: true,
      inquiryId: inquiry.id,
    };
  } catch (error: unknown) {
    console.error('Error submitting viewing inquiry:', error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Failed to record viewing inquiry' };
  }
}
