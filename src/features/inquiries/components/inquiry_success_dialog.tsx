'use client';

import React from 'react';
import Link from 'next/link';
import { Modal } from '@/core/ui/modal';
import { CheckCircle2 } from 'lucide-react';

export interface InquirySuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  guestName: string;
  preferredDate: string;
  preferredTimeSlot: string;
  pieceTitle?: string;
}

export function InquirySuccessDialog({
  isOpen,
  onClose,
  guestName,
  preferredDate,
  preferredTimeSlot,
  pieceTitle,
}: InquirySuccessDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Salon Viewing Confirmed">
      <div className="text-center py-4 space-y-4">
        <div className="inline-flex p-3 rounded-full bg-sage-100 text-sage-600 mb-1">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h4 className="font-editorial text-xl font-medium text-editorial-text">
          Appointment Staging Registered
        </h4>

        <p className="text-xs sm:text-sm text-editorial-muted leading-relaxed max-w-sm mx-auto">
          Thank you, <strong className="text-editorial-text">{guestName}</strong>. Our salon curator will stage{' '}
          {pieceTitle ? <strong className="text-editorial-text">{pieceTitle}</strong> : 'your requested creation'}{' '}
          in a private fitting suite at 14 Rue de l&apos;Aube for{' '}
          <strong className="text-editorial-text">
            {preferredDate} ({preferredTimeSlot})
          </strong>
          .
        </p>

        <div className="p-3 bg-black/[0.02] rounded-xl text-xs text-editorial-muted border border-black/5 text-left">
          <p className="font-medium text-editorial-text mb-1">Atelier Protocol Notice</p>
          <p>
            Private viewings include complimentary coffee, textile inspection, and personal garment adjustments
            conducted by our resident tailors.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link
            href="/catalog"
            className="flex-1 inline-flex items-center justify-center text-xs font-medium bg-obsidian text-white h-10 px-4 rounded-xl hover:bg-obsidian-hover transition-colors"
          >
            Return to Artisan Catalog
          </Link>
          <button
            onClick={onClose}
            className="flex-1 inline-flex items-center justify-center text-xs font-medium border border-black/10 bg-white text-editorial-text h-10 px-4 rounded-xl hover:bg-black/5 transition-colors"
          >
            Close Dialog
          </button>
        </div>
      </div>
    </Modal>
  );
}
