'use client';

import React, { useState } from 'react';
import { ViewingInquirySummary, InquiryStatus } from '@/features/inquiries/contracts/inquiry.dto';
import { updateInquiryStatusAction } from '@/features/inquiries/actions/update_inquiry_status.action';
import { Badge } from '@/core/ui/badge';
import { Button } from '@/core/ui/button';

export interface InquiryTableProps {
  initialInquiries: ViewingInquirySummary[];
}

export function InquiryTable({ initialInquiries }: InquiryTableProps) {
  const [inquiries, setInquiries] = useState<ViewingInquirySummary[]>(initialInquiries);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusChange = async (id: string, newStatus: InquiryStatus, suite?: string) => {
    setUpdatingId(id);
    const res = await updateInquiryStatusAction(id, newStatus, suite);
    setUpdatingId(null);

    if (res.success) {
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus, fittingSuite: suite || inq.fittingSuite } : inq))
      );
    }
  };

  const statusVariants: Record<InquiryStatus, 'default' | 'sage' | 'amber' | 'obsidian'> = {
    NEW: 'amber',
    STAGED: 'sage',
    COMPLETED: 'obsidian',
    ARCHIVED: 'default',
  };

  if (inquiries.length === 0) {
    return (
      <div className="p-12 text-center rounded-2xl bg-white border border-black/5 text-editorial-muted text-sm">
        No viewing inquiries currently recorded in the salon inbox.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-black/5 text-left text-xs">
        <thead className="bg-black/[0.02] text-editorial-muted uppercase font-medium tracking-wider">
          <tr>
            <th className="px-5 py-3.5">Guest &amp; Contact</th>
            <th className="px-5 py-3.5">Requested Piece</th>
            <th className="px-5 py-3.5">Date &amp; Window</th>
            <th className="px-5 py-3.5">Status &amp; Suite</th>
            <th className="px-5 py-3.5 text-right">Coordination Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/5 text-editorial-text">
          {inquiries.map((inq) => (
            <tr key={inq.id} className="hover:bg-black/[0.01] transition-colors">
              <td className="px-5 py-4">
                <div className="font-medium text-editorial-text">{inq.guestName}</div>
                <div className="text-editorial-muted text-[11px]">{inq.guestEmail}</div>
                {inq.guestPhone && <div className="text-editorial-muted text-[10px]">{inq.guestPhone}</div>}
              </td>
              <td className="px-5 py-4">
                {inq.creation ? (
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider block text-editorial-muted">
                      {inq.creation.pieceCode}
                    </span>
                    <span className="font-medium">{inq.creation.title}</span>
                  </div>
                ) : (
                  <span className="italic text-editorial-muted">General Salon Fitting</span>
                )}
                {inq.fittingNotes && (
                  <div className="mt-1 text-[11px] text-editorial-muted max-w-xs italic line-clamp-2">
                    &ldquo;{inq.fittingNotes}&rdquo;
                  </div>
                )}
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <div className="font-medium">{inq.preferredDate}</div>
                <div className="text-editorial-muted text-[11px]">{inq.preferredTimeSlot}</div>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <Badge variant={statusVariants[inq.status]}>{inq.status}</Badge>
                {inq.fittingSuite && (
                  <div className="text-[11px] text-sage-600 font-medium mt-1">{inq.fittingSuite}</div>
                )}
              </td>
              <td className="px-5 py-4 text-right whitespace-nowrap space-x-2">
                {inq.status === 'NEW' && (
                  <>
                    <Button
                      size="sm"
                      variant="sage"
                      onClick={() => handleStatusChange(inq.id, 'STAGED', 'Private Fitting Suite A')}
                      disabled={updatingId === inq.id}
                    >
                      Stage in Suite A
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusChange(inq.id, 'STAGED', 'Private Fitting Suite B')}
                      disabled={updatingId === inq.id}
                    >
                      Suite B
                    </Button>
                  </>
                )}
                {inq.status === 'STAGED' && (
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => handleStatusChange(inq.id, 'COMPLETED')}
                    disabled={updatingId === inq.id}
                  >
                    Mark Completed
                  </Button>
                )}
                {inq.status === 'COMPLETED' && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleStatusChange(inq.id, 'ARCHIVED')}
                    disabled={updatingId === inq.id}
                  >
                    Archive
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
