'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/actions/auth_options';
import { prisma } from '@/core/database/prisma';
import { AvailabilityStatus } from '@prisma/client';

export async function updateGarmentStatusAction(garmentId: string, status: AvailabilityStatus) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized administrative action' };
  }

  try {
    const updated = await prisma.catalogCreation.update({
      where: { id: garmentId },
      data: { availabilityStatus: status },
    });

    return { success: true, creation: updated };
  } catch (error) {
    console.error('Error updating garment status:', error);
    return { success: false, error: 'Failed to update garment availability' };
  }
}
