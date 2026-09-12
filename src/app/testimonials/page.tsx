import React from 'react';
import Link from 'next/link';
import { getPublicTestimonialsAction } from '@/features/testimonials/actions/get_public_testimonials.action';
import { TestimonialShowcaseGrid } from '@/features/testimonials/components/testimonial_showcase_grid';
import { Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Patron Accolades & Testimonials | Maison Valencourt Atelier',
  description: 'Verified reflections and accolades from patrons on Maison Valencourt bespoke craftsmanship and salon service.',
};

export const dynamic = 'force-dynamic';

export default async function PublicTestimonialsPage() {
  const testimonials = await getPublicTestimonialsAction();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Editorial Header */}
      <div className="max-w-2xl mb-12">
        <span className="text-xs uppercase tracking-[0.2em] text-editorial-muted font-medium block mb-2">
          Verified Patron Reflections
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-medium tracking-tight text-editorial-text mb-4">
          Atelier Accolades
        </h1>
        <p className="text-sm sm:text-base text-editorial-muted leading-relaxed">
          Reflections on hand-canvased drape, private fitting suite consultations, and sartorial finishing. All reviews
          are submitted by verified patrons and approved under the atelier director moderation standard.
        </p>
      </div>

      <div className="mb-10 p-4 rounded-2xl bg-sage-50/70 border border-sage-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-sage-100 text-sage-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-editorial text-base text-editorial-text font-medium">
              Have you acquired an atelier creation?
            </h4>
            <p className="text-xs text-editorial-muted">
              Authenticated patrons are invited to submit their sartorial reflections.
            </p>
          </div>
        </div>

        <Link
          href="/patron/testimonials/new"
          className="inline-flex items-center justify-center text-xs font-medium uppercase tracking-wider bg-obsidian text-white h-10 px-5 rounded-xl hover:bg-obsidian-hover transition-colors whitespace-nowrap"
        >
          Submit Testimonial
        </Link>
      </div>

      <TestimonialShowcaseGrid testimonials={testimonials} />
    </div>
  );
}
