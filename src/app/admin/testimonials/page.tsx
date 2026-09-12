import React from 'react';
import { prisma } from '@/core/database/prisma';
import { ModerationQueueTable } from '@/features/admin/components/moderation_queue_table';

export const metadata = {
  title: 'Testimonial Moderation (ACC) | Maison Valencourt',
};

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    include: {
      patron: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-editorial-muted font-medium block mb-1">
          Double-Blind Quality Gate
        </span>
        <h1 className="font-editorial text-3xl font-medium text-editorial-text">
          Testimonial Moderation Queue (ACC)
        </h1>
        <p className="text-xs sm:text-sm text-editorial-muted mt-1 leading-relaxed">
          Verify patron feedback against atelier guest records. Direct publishing is prohibited; items enter{' '}
          <code>APPROVED</code> status only upon director approval. Retraction requests must be manually confirmed.
        </p>
      </div>

      <ModerationQueueTable initialTestimonials={testimonials} />
    </div>
  );
}
