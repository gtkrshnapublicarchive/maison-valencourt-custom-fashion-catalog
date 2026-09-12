import React from 'react';
import { Card } from '@/core/ui/card';
import { Star } from 'lucide-react';

export interface TestimonialCardProps {
  authorName: string;
  cityOrRegion: string;
  creationReferenced?: string | null;
  rating: number;
  content: string;
  reviewedAt?: Date | null;
}

export function TestimonialCard({
  authorName,
  cityOrRegion,
  creationReferenced,
  rating,
  content,
  reviewedAt,
}: TestimonialCardProps) {
  return (
    <Card className="p-6 flex flex-col justify-between h-full border border-black/10 hover:shadow-sm transition-shadow">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? 'fill-amber-400 text-amber-500' : 'text-black/15'
                }`}
              />
            ))}
          </div>
          {reviewedAt && (
            <span className="text-[10px] text-editorial-muted">
              {new Date(reviewedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
              })}
            </span>
          )}
        </div>

        {creationReferenced && (
          <div className="mb-3 text-[11px] font-medium text-sage-600 bg-sage-50 px-2.5 py-1 rounded-md inline-block border border-sage-200/50">
            {creationReferenced}
          </div>
        )}

        <blockquote className="text-sm leading-relaxed text-editorial-text font-serif italic mb-4">
          &ldquo;{content}&rdquo;
        </blockquote>
      </div>

      <div className="pt-3 border-t border-black/5 flex items-center justify-between text-xs">
        <div>
          <span className="font-medium text-editorial-text block">{authorName}</span>
          <span className="text-[11px] text-editorial-muted">{cityOrRegion}</span>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-sage-600 font-medium">
          Verified Patron
        </span>
      </div>
    </Card>
  );
}
