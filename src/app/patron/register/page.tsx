import React, { Suspense } from 'react';
import { PatronRegisterForm } from '@/features/auth/components/patron_register_form';

export const metadata = {
  title: 'Register as Patron | Maison Valencourt Atelier',
  description: 'Establish your authenticated patron profile with Maison Valencourt Atelier.',
};

export default function PatronRegisterPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="text-center text-xs text-editorial-muted">Loading registration...</div>}>
        <PatronRegisterForm />
      </Suspense>
    </div>
  );
}
