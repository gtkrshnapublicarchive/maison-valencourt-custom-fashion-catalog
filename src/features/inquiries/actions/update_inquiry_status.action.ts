'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/actions/auth_options';
import { prisma } from '@/core/database/prisma';
import { InquiryStatus } from '@/features/inquiries/contracts/inquiry.dto';

export async function updateInquiryStatusAction(
  inquiryId: string,
  status: InquiryStatus,
  fittingSuite?: string
) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized administrative action' };
  }

  try {
    const updated = await prisma.viewingInquiry.update({
      where: { id: inquiryId },
      data: {
        status,
        fittingSuite: fittingSuite || undefined,
      },
    });

    return { success: true, inquiry: updated };
  } catch (error) {
    console.error('Error updating inquiry status:', error);
    return { success: false, error: 'Failed to update inquiry status' };
  }
}
