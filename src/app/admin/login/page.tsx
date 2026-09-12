import React from 'react';
import { AdminLoginForm } from '@/features/auth/components/admin_login_form';

export const metadata = {
  title: 'Atelier Director Portal | Maison Valencourt',
  description: 'Internal administrative access for Maison Valencourt Atelier.',
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <AdminLoginForm />
    </div>
  );
}
