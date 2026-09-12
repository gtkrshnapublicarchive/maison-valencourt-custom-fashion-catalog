'use client';

import React, { useState } from 'react';
import { Modal } from '@/core/ui/modal';
import { Button } from '@/core/ui/button';
import { requestDeletionAction } from '@/features/testimonials/actions/request_deletion.action';

export interface DeletionRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  testimonialId: string;
  onRequested: () => void;
}

export function DeletionRequestModal({
  isOpen,
  onClose,
  testimonialId,
  onRequested,
}: DeletionRequestModalProps) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const res = await requestDeletionAction({
      testimonialId,
      reason,
    });

    setIsLoading(false);

    if (res.success) {
      onRequested();
      onClose();
    } else {
      setError(res.error || 'Failed to submit deletion request.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Request Testimonial Retraction"
      description="Under the Atelier Immutability Rule, review removals require formal Director confirmation."
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="block text-xs font-medium uppercase tracking-wider text-editorial-muted">
            Reason for Retraction Request (Min. 10 characters)
          </label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            minLength={10}
            maxLength={300}
            placeholder="e.g. Privacy update requested for client portfolio..."
            className="w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm text-editorial-text focus:outline-none focus:ring-1 focus:ring-sage-500"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" variant="default" className="flex-1" isLoading={isLoading}>
            Submit Retraction Request
          </Button>
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
