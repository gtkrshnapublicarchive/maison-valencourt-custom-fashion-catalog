'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/core/ui/input';
import { Button } from '@/core/ui/button';
import { Card } from '@/core/ui/card';
import { submitInquiryAction } from '@/features/inquiries/actions/submit_inquiry.action';
import { InquirySuccessDialog } from '@/features/inquiries/components/inquiry_success_dialog';

export interface ViewingInquiryFormProps {
  initialPatronName?: string;
  initialPatronEmail?: string;
}

export function ViewingInquiryForm({
  initialPatronName = '',
  initialPatronEmail = '',
}: ViewingInquiryFormProps) {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();

  const queryPieceCode = searchParams.get('pieceCode') || '';
  const queryTitle = searchParams.get('title') || '';

  const activePatronName = session?.user?.name || initialPatronName;
  const activePatronEmail = session?.user?.email || initialPatronEmail;

  const [guestName, setGuestName] = useState(activePatronName);
  const [guestEmail, setGuestEmail] = useState(activePatronEmail);
  const [guestPhone, setGuestPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('11:00 - 12:30');
  const [pieceCode, setPieceCode] = useState(queryPieceCode);
  const [fittingNotes, setFittingNotes] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const res = await submitInquiryAction({
      guestName: guestName || activePatronName,
      guestEmail: guestEmail || activePatronEmail,
      guestPhone,
      preferredDate,
      preferredTimeSlot,
      fittingNotes,
      pieceCode,
    });

    setIsLoading(false);

    if (res.success) {
      setIsSuccessOpen(true);
    } else {
      setError(res.error || 'Failed to submit salon viewing inquiry');
    }
  };

  if (status === 'unauthenticated' && !activePatronEmail) {
    const callbackUrl = `/viewing-inquiry${queryPieceCode ? `?pieceCode=${queryPieceCode}&title=${encodeURIComponent(queryTitle)}` : ''}`;
    return (
      <Card className="p-8 max-w-xl w-full mx-auto shadow-sm text-center space-y-4">
        <span className="text-xs uppercase font-medium tracking-[0.2em] text-editorial-muted block">
          Patron Authentication Required
        </span>
        <h2 className="font-editorial text-2xl font-medium text-editorial-text">
          Exclusive Salon Appointments
        </h2>
        <p className="text-sm text-editorial-muted leading-relaxed">
          Private viewing appointments and fitting suite reservations at 14 Rue de l&apos;Aube are reserved exclusively for authenticated patrons.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href={`/patron/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="inline-flex items-center justify-center font-medium bg-obsidian text-white h-11 px-6 rounded-xl hover:bg-obsidian-hover transition-colors text-sm"
          >
            Sign In as Patron
          </Link>
          <Link
            href={`/patron/register?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="inline-flex items-center justify-center font-medium border border-black/10 bg-white text-editorial-text h-11 px-6 rounded-xl hover:bg-black/5 transition-colors text-sm"
          >
            Register as Patron
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card className="p-8 max-w-2xl w-full mx-auto shadow-sm">
        <div className="mb-6">
          <span className="text-xs uppercase font-medium tracking-[0.2em] text-editorial-muted block mb-1">
            Private Salon Fitting Suite
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-editorial-text">
            Book Salon Viewing Appointment
          </h2>
          <p className="text-xs sm:text-sm text-editorial-muted mt-1.5 leading-relaxed">
            Select an artisan piece for private fitting and textile consultation in our 14 Rue de l&apos;Aube salon.
            Operating hours: Tuesday &ndash; Saturday, 10:00 &ndash; 19:00.
          </p>
        </div>

        <div className="mb-6 p-4 rounded-xl bg-sage-50 border border-sage-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sage-600"></span>
            <span className="text-editorial-muted">Authenticated Patron:</span>
            <span className="font-medium text-editorial-text">{guestName || activePatronName || 'Registered Patron'}</span>
          </div>
          <span className="text-editorial-muted font-mono">{guestEmail || activePatronEmail}</span>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Patron / Guest Name"
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Full name"
              required
            />
            <Input
              label="Contact Email"
              type="email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              placeholder="contact@patron.com"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Telephone (Optional)"
              type="tel"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
            />
            <Input
              label="Garment Reference Code"
              type="text"
              value={pieceCode}
              onChange={(e) => setPieceCode(e.target.value)}
              placeholder="e.g. MVC-2026-J04"
              hint={queryTitle ? `Selected: ${queryTitle}` : undefined}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Preferred Date (Tue - Sat)"
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              required
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-medium uppercase tracking-wider text-editorial-muted">
                Preferred Time Window
              </label>
              <select
                value={preferredTimeSlot}
                onChange={(e) => setPreferredTimeSlot(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm text-editorial-text focus:outline-none focus:ring-1 focus:ring-sage-500"
              >
                <option value="10:00 - 11:30">Morning Salon: 10:00 &ndash; 11:30</option>
                <option value="11:30 - 13:00">Midday Salon: 11:30 &ndash; 13:00</option>
                <option value="14:00 - 15:30">Afternoon Salon I: 14:00 &ndash; 15:30</option>
                <option value="15:30 - 17:00">Afternoon Salon II: 15:30 &ndash; 17:00</option>
                <option value="17:00 - 18:30">Twilight Salon: 17:00 &ndash; 18:30</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium uppercase tracking-wider text-editorial-muted">
              Fitting Requirements &amp; Sizing Notes (Optional)
            </label>
            <textarea
              rows={3}
              value={fittingNotes}
              onChange={(e) => setFittingNotes(e.target.value)}
              placeholder="Note any specific shoulder adjustments, sleeve requirements, or styling questions..."
              className="w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm text-editorial-text placeholder:text-black/30 transition-colors focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
            />
          </div>

          <Button type="submit" variant="default" className="w-full mt-4 h-12" isLoading={isLoading}>
            Submit Salon Staging Inquiry
          </Button>
        </form>
      </Card>

      <InquirySuccessDialog
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        guestName={guestName}
        preferredDate={preferredDate}
        preferredTimeSlot={preferredTimeSlot}
        pieceTitle={queryTitle || pieceCode}
      />
    </>
  );
}
