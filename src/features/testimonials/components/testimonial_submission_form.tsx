'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/core/ui/input';
import { Button } from '@/core/ui/button';
import { Card } from '@/core/ui/card';
import { Star, ShieldCheck } from 'lucide-react';
import { submitTestimonialAction } from '@/features/testimonials/actions/submit_testimonial.action';

export interface TestimonialSubmissionFormProps {
  initialAuthorName: string;
  initialCity: string;
}

export function TestimonialSubmissionForm({ initialAuthorName, initialCity }: TestimonialSubmissionFormProps) {
  const router = useRouter();

  const [authorName, setAuthorName] = useState(initialAuthorName);
  const [cityOrRegion, setCityOrRegion] = useState(initialCity);
  const [creationReferenced, setCreationReferenced] = useState('');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const res = await submitTestimonialAction({
      authorName,
      cityOrRegion,
      creationReferenced,
      rating,
      content,
    });

    setIsLoading(false);

    if (res.success) {
      router.push('/patron/testimonials?submitted=true');
    } else {
      setError(res.error || 'Failed to submit testimonial.');
    }
  };

  return (
    <Card className="p-8 max-w-xl w-full mx-auto shadow-sm">
      <div className="mb-6">
        <span className="text-xs uppercase font-medium tracking-[0.2em] text-editorial-muted block mb-1">
          Sartorial Feedback
        </span>
        <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-editorial-text">
          Submit Patron Testimonial
        </h2>
        <p className="text-xs text-editorial-muted mt-1.5 leading-relaxed">
          Reflect upon the artisan hand-canvasing, fitting suite consultation, and styling craftsmanship of your
          Maison Valencourt piece.
        </p>
      </div>

      <div className="mb-6 p-3.5 rounded-xl bg-sage-50 border border-sage-200/60 flex items-start gap-2.5 text-xs text-editorial-text">
        <ShieldCheck className="w-4 h-4 text-sage-600 mt-0.5 flex-shrink-0" />
        <p>
          <strong>Atelier Moderation Gate (ACC):</strong> Submissions enter <code>PENDING_REVIEW</code> and are verified
          by the Atelier Director before public display. Approved reviews become permanently immutable.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Author Name"
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
          />
          <Input
            label="City / District"
            type="text"
            value={cityOrRegion}
            onChange={(e) => setCityOrRegion(e.target.value)}
            required
          />
        </div>

        <Input
          label="Garment Referenced (Optional)"
          type="text"
          value={creationReferenced}
          onChange={(e) => setCreationReferenced(e.target.value)}
          placeholder="e.g. MVC-2026-X01 Midnight Solstice Dinner Jacket"
        />

        <div className="space-y-1.5">
          <label className="block text-xs font-medium uppercase tracking-wider text-editorial-muted">
            Craftsmanship Rating
          </label>
          <div className="flex items-center gap-1 py-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1 text-amber-500 hover:scale-110 transition-transform"
                aria-label={`Rate ${star} star`}
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= rating ? 'fill-amber-400 text-amber-500' : 'text-black/20'
                  }`}
                />
              </button>
            ))}
            <span className="text-xs font-medium text-editorial-muted ml-2">{rating} of 5 stars</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium uppercase tracking-wider text-editorial-muted">
            Testimonial Narrative (30 &ndash; 600 characters)
          </label>
          <textarea
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            minLength={30}
            maxLength={600}
            placeholder="Describe your bespoke experience with our master tailors, the silhouette precision, and the tactile quality of the cloth..."
            className="w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm text-editorial-text placeholder:text-black/30 transition-colors focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
          />
          <div className="flex justify-between text-[11px] text-editorial-muted">
            <span>Minimum 30 characters</span>
            <span>{content.length}/600</span>
          </div>
        </div>

        <Button type="submit" variant="default" className="w-full mt-4 h-12" isLoading={isLoading}>
          Submit Testimonial for Review
        </Button>
      </form>
    </Card>
  );
}
