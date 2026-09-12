'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/actions/auth_options';
import { prisma } from '@/core/database/prisma';

export interface PatronMetrics {
  wishlistCount: number;
  wishlistTotalAurum: number;
  reviewsCount: number;
  reviewsApprovedCount: number;
  inquiriesCount: number;
}

export interface AdminMetrics {
  totalCreationsCount: number;
  pendingReviewsCount: number;
  totalInquiriesCount: number;
  totalPatronsCount: number;
}

export interface UserProfileData {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'PATRON';
  cityOrRegion: string | null;
  createdAt: Date;
  patronMetrics?: PatronMetrics;
  adminMetrics?: AdminMetrics;
}

export async function getProfileMetricsAction(): Promise<UserProfileData | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      cityOrRegion: true,
      createdAt: true,
    },
  });

  if (!user) return null;

  if (user.role === 'PATRON') {
    const [wishlistItems, reviews, approvedReviews, inquiries] = await Promise.all([
      prisma.wishlistItem.findMany({
        where: { patronId: user.id },
        include: { creation: { select: { valuationAurum: true } } },
      }),
      prisma.testimonial.count({ where: { patronId: user.id } }),
      prisma.testimonial.count({ where: { patronId: user.id, status: 'APPROVED' } }),
      prisma.viewingInquiry.count({ where: { patronId: user.id } }),
    ]);

    const wishlistTotalAurum = wishlistItems.reduce(
      (sum, item) => sum + (item.creation?.valuationAurum || 0),
      0
    );

    return {
      ...user,
      patronMetrics: {
        wishlistCount: wishlistItems.length,
        wishlistTotalAurum,
        reviewsCount: reviews,
        reviewsApprovedCount: approvedReviews,
        inquiriesCount: inquiries,
      },
    };
  }

  // Admin role metrics
  const [totalCreations, pendingReviews, totalInquiries, totalPatrons] = await Promise.all([
    prisma.catalogCreation.count(),
    prisma.testimonial.count({ where: { status: 'PENDING_REVIEW' } }),
    prisma.viewingInquiry.count(),
    prisma.user.count({ where: { role: 'PATRON' } }),
  ]);

  return {
    ...user,
    adminMetrics: {
      totalCreationsCount: totalCreations,
      pendingReviewsCount: pendingReviews,
      totalInquiriesCount: totalInquiries,
      totalPatronsCount: totalPatrons,
    },
  };
}
