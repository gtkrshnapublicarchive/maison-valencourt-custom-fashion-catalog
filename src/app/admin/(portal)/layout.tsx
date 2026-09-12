import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/features/auth/actions/auth_options';
import { AdminHeader } from '@/features/admin/components/admin_header';
import { AdminSidebar } from '@/features/admin/components/admin_sidebar';

export const metadata = {
  title: 'Atelier Director Portal | Maison Valencourt',
  description: 'Administrative command center for Maison Valencourt Atelier.',
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  // Strict DOM exclusion & security: unauthorized requests bounce silently to /admin/login
  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <AdminHeader />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-8 overflow-y-auto max-w-7xl mx-auto w-full">{children}</main>
      </div>
    </div>
  );
}
