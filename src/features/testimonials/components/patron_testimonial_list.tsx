'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TestimonialSummary, TestimonialStatus } from '@/features/testimonials/contracts/testimonial.dto';
import { Card } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { Button } from '@/core/ui/button';
import { Star, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { DeletionRequestModal } from '@/features/testimonials/components/deletion_request_modal';

export interface PatronTestimonialListProps {
  initialTestimonials: TestimonialSummary[];
}

export function PatronTestimonialList({ initialTestimonials }: PatronTestimonialListProps) {
  const [items, setItems] = useState<TestimonialSummary[]>(initialTestimonials);
  const [selectedForDeletion, setSelectedForDeletion] = useState<string | null>(null);

  const statusConfigs: Record<
    TestimonialStatus,
    { label: string; variant: 'amber' | 'sage' | 'default' | 'obsidian'; icon: React.ReactNode }
  > = {
    PENDING_REVIEW: {
      label: 'Pending Atelier Approval',
      variant: 'amber',
      icon: <Clock className="w-3.5 h-3.5 mr-1" />,
    },
    APPROVED: {
      label: 'Approved & Published',
      variant: 'sage',
      icon: <CheckCircle2 className="w-3.5 h-3.5 mr-1" />,
    },
    REJECTED: {
      label: 'Archived by Director',
      variant: 'default',
      icon: <XCircle className="w-3.5 h-3.5 mr-1" />,
    },
    DELETION_PENDING: {
      label: 'Retraction Pending Review',
      variant: 'amber',
      icon: <AlertCircle className="w-3.5 h-3.5 mr-1" />,
    },
    DELETED: {
      label: 'Retracted',
      variant: 'default',
      icon: <XCircle className="w-3.5 h-3.5 mr-1" />,
    },
  };

  const handleDeletionSuccess = () => {
    if (selectedForDeletion) {
      setItems((prev) =>
        prev.map((t) => (t.id === selectedForDeletion ? { ...t, status: 'DELETION_PENDING' } : t))
      );
    }
  };

  if (items.length === 0) {
    return (
      <Card className="p-12 text-center max-w-lg mx-auto border border-black/5">
        <p className="text-sm text-editorial-muted mb-4">
          You have not submitted any sartorial testimonials yet.
        </p>
        <Link
          href="/patron/testimonials/new"
          className="inline-flex items-center justify-center font-medium bg-obsidian text-white h-10 px-5 rounded-xl hover:bg-obsidian-hover transition-colors text-xs uppercase tracking-wider"
        >
          Submit Testimonial
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-black/10">
        <span className="text-xs text-editorial-muted">
          Your Recorded Submissions ({items.length})
        </span>
        <Link
          href="/patron/testimonials/new"
          className="text-xs font-medium text-obsidian underline underline-offset-4 hover:opacity-80"
        >
          Submit Fresh Accolade &rarr;
        </Link>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const cfg = statusConfigs[item.status] || statusConfigs.PENDING_REVIEW;

          return (
            <Card key={item.id} className="p-6 border border-black/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant={cfg.variant} className="flex items-center">
                    {cfg.icon}
                    {cfg.label}
                  </Badge>
                  {item.creationReferenced && (
                    <span className="text-xs font-medium text-editorial-muted truncate max-w-xs">
                      {item.creationReferenced}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < item.rating ? 'fill-amber-400 text-amber-500' : 'text-black/15'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <blockquote className="text-sm font-serif italic text-editorial-text mb-4 leading-relaxed">
                &ldquo;{item.content}&rdquo;
              </blockquote>

              {item.rejectionReason && (
                <div className="mb-4 p-3 rounded-xl bg-black/[0.02] border border-black/5 text-xs text-editorial-muted">
                  <strong>Director Remark:</strong> {item.rejectionReason}
                </div>
              )}

              <div className="pt-3 border-t border-black/5 flex items-center justify-between text-xs text-editorial-muted">
                <span>Submitted {new Date(item.createdAt).toLocaleDateString()}</span>

                {item.status === 'APPROVED' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedForDeletion(item.id)}
                    className="text-xs text-editorial-muted hover:text-red-600"
                  >
                    Request Retraction
                  </Button>
                )}

                {item.status === 'DELETION_PENDING' && (
                  <span className="text-amber-700 italic">Deletion request awaiting director action</span>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {selectedForDeletion && (
        <DeletionRequestModal
          isOpen={!!selectedForDeletion}
          onClose={() => setSelectedForDeletion(null)}
          testimonialId={selectedForDeletion}
          onRequested={handleDeletionSuccess}
        />
      )}
    </div>
  );
}
