import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/features/auth/actions/auth_options';
import { TestimonialSubmissionForm } from '@/features/testimonials/components/testimonial_submission_form';

export const metadata = {
  title: 'Submit Testimonial | Maison Valencourt Atelier',
  description: 'Submit an authenticated sartorial review for Maison Valencourt craftsmanship.',
};

export default async function NewTestimonialPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/patron/login?callbackUrl=/patron/testimonials/new');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <TestimonialSubmissionForm
        initialAuthorName={session.user.name || ''}
        initialCity={session.user.cityOrRegion || 'Aurelia City'}
      />
    </div>
  );
}
