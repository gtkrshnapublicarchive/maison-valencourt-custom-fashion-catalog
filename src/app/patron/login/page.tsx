import React, { Suspense } from 'react';
import { PatronLoginForm } from '@/features/auth/components/patron_login_form';

export const metadata = {
  title: 'Patron Sign In | Maison Valencourt Atelier',
  description: 'Sign into your Maison Valencourt Patron account to manage your wishlist and sartorial accolades.',
};

export default function PatronLoginPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="text-center text-xs text-editorial-muted">Loading portal...</div>}>
        <PatronLoginForm />
      </Suspense>
    </div>
  );
}
