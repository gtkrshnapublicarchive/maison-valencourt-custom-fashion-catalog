import React, { Suspense } from 'react';
import { ViewingInquiryForm } from '@/features/inquiries/components/viewing_inquiry_form';

export const metadata = {
  title: 'Book Salon Viewing | Maison Valencourt Atelier',
  description: 'Request a private salon viewing and fitting appointment at 14 Rue de l’Aube, Aurelia City.',
};

export default function ViewingInquiryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Suspense fallback={<div className="text-xs text-editorial-muted text-center">Loading booking portal...</div>}>
        <ViewingInquiryForm />
      </Suspense>
    </div>
  );
}
