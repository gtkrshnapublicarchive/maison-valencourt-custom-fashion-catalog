import React from 'react';
import { getInquiriesAction } from '@/features/inquiries/actions/get_inquiries.action';
import { InquiryTable } from '@/features/inquiries/components/inquiry_table';

export const metadata = {
  title: 'Salon Viewing Inquiries | Maison Valencourt',
};

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiriesAction();

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-editorial-muted font-medium block mb-1">
          Fitting Suite Appointments
        </span>
        <h1 className="font-editorial text-3xl font-medium text-editorial-text">
          Salon Viewing Requests
        </h1>
        <p className="text-xs sm:text-sm text-editorial-muted mt-1 leading-relaxed">
          Manage guest and patron requests to try on specific artisan garments. Assign private fitting suites (Suite A or
          Suite B) to stage requested pieces before arrival.
        </p>
      </div>

      <InquiryTable initialInquiries={inquiries} />
    </div>
  );
}
