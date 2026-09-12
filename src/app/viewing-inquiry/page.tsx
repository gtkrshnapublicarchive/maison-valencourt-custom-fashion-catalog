import React, { Suspense } from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/features/auth/actions/auth_options';
import { ViewingInquiryForm } from '@/features/inquiries/components/viewing_inquiry_form';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Book Salon Viewing | Maison Valencourt Atelier',
  description: 'Request a private salon viewing and fitting appointment at 14 Rue de l’Aube, Aurelia City.',
};

interface ViewingInquiryPageProps {
  searchParams: Promise<{
    pieceCode?: string;
    title?: string;
  }>;
}

export default async function ViewingInquiryPage({ searchParams }: ViewingInquiryPageProps) {
  const resolvedParams = await searchParams;
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    let callbackUrl = '/viewing-inquiry';
    const params = new URLSearchParams();
    if (resolvedParams.pieceCode) params.set('pieceCode', resolvedParams.pieceCode);
    if (resolvedParams.title) params.set('title', resolvedParams.title);
    const qs = params.toString();
    if (qs) {
      callbackUrl += `?${qs}`;
    }
    redirect(`/patron/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Suspense fallback={<div className="text-xs text-editorial-muted text-center">Loading booking portal...</div>}>
        <ViewingInquiryForm
          initialPatronName={session.user.name || ''}
          initialPatronEmail={session.user.email || ''}
        />
      </Suspense>
    </div>
  );
}
