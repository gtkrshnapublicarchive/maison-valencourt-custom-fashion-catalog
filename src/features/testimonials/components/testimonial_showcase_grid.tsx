import React from 'react';
import { TestimonialSummary } from '@/features/testimonials/contracts/testimonial.dto';
import { TestimonialCard } from '@/features/testimonials/components/testimonial_card';

export interface TestimonialShowcaseGridProps {
  testimonials: TestimonialSummary[];
}

export function TestimonialShowcaseGrid({ testimonials }: TestimonialShowcaseGridProps) {
  if (testimonials.length === 0) {
    return (
      <div className="p-16 text-center rounded-2xl bg-white border border-black/5 text-editorial-muted text-sm">
        No published accolades yet. Registered patrons may submit reflections on their salon experience.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((t) => (
        <TestimonialCard
          key={t.id}
          authorName={t.authorName}
          cityOrRegion={t.cityOrRegion}
          creationReferenced={t.creationReferenced}
          rating={t.rating}
          content={t.content}
          reviewedAt={t.reviewedAt}
        />
      ))}
    </div>
  );
}
