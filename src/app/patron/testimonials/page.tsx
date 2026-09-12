import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/features/auth/actions/auth_options';
import { getPatronTestimonialsAction } from '@/features/testimonials/actions/get_patron_testimonials.action';
import { PatronTestimonialList } from '@/features/testimonials/components/patron_testimonial_list';

export const metadata = {
  title: 'My Sartorial Accolades | Maison Valencourt Atelier',
  description: 'Track the moderation and publication status of your submitted atelier reflections.',
};

export default async function PatronTestimonialsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/patron/login?callbackUrl=/patron/testimonials');
  }

  const items = await getPatronTestimonialsAction();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mb-10">
        <span className="text-xs uppercase tracking-[0.2em] text-editorial-muted font-medium block mb-2">
          Patron Vault Records
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-editorial-text mb-3">
          Your Testimonial Submissions
        </h1>
        <p className="text-sm text-editorial-muted leading-relaxed">
          Review the approval status of your atelier reflections. Under our authenticity policy, published testimonials
          are immutable and require a director retraction request for removal.
        </p>
      </div>

      <PatronTestimonialList initialTestimonials={items} />
    </div>
  );
}
