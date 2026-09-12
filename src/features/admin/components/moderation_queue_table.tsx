'use client';

import React, { useState } from 'react';
import { TestimonialSummary, TestimonialStatus } from '@/features/testimonials/contracts/testimonial.dto';
import {
  approveTestimonialAction,
  rejectTestimonialAction,
  confirmDeletionAction,
} from '@/features/testimonials/actions/moderate_testimonial.action';
import { Badge } from '@/core/ui/badge';
import { Button } from '@/core/ui/button';
import { Star, CheckCircle, XCircle, Trash2 } from 'lucide-react';

export interface ModerationQueueTableProps {
  initialTestimonials: TestimonialSummary[];
}

export function ModerationQueueTable({ initialTestimonials }: ModerationQueueTableProps) {
  const [items, setItems] = useState<TestimonialSummary[]>(initialTestimonials);
  const [activeTab, setActiveTab] = useState<'PENDING_REVIEW' | 'APPROVED' | 'DELETION_PENDING' | 'ALL'>('PENDING_REVIEW');
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [rejectionReasonPromptId, setRejectionReasonPromptId] = useState<string | null>(null);
  const [rejectionNote, setRejectionNote] = useState('');

  const filteredItems = items.filter((item) => {
    if (activeTab === 'ALL') return true;
    return item.status === activeTab;
  });

  const handleApprove = async (id: string) => {
    setActionInProgress(id);
    const res = await approveTestimonialAction(id);
    setActionInProgress(null);

    if (res.success) {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: 'APPROVED' as TestimonialStatus } : item))
      );
    }
  };

  const handleReject = async (id: string) => {
    if (!rejectionNote.trim()) return;
    setActionInProgress(id);
    const res = await rejectTestimonialAction(id, rejectionNote);
    setActionInProgress(null);
    setRejectionReasonPromptId(null);
    setRejectionNote('');

    if (res.success) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status: 'REJECTED' as TestimonialStatus, rejectionReason: rejectionNote }
            : item
        )
      );
    }
  };

  const handleConfirmDeletion = async (id: string) => {
    setActionInProgress(id);
    const res = await confirmDeletionAction(id);
    setActionInProgress(null);

    if (res.success) {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: 'DELETED' as TestimonialStatus } : item))
      );
    }
  };

  const statusVariants: Record<TestimonialStatus, 'amber' | 'sage' | 'default' | 'obsidian'> = {
    PENDING_REVIEW: 'amber',
    APPROVED: 'sage',
    REJECTED: 'default',
    DELETION_PENDING: 'amber',
    DELETED: 'default',
  };

  return (
    <div className="space-y-4">
      {/* Tab Selectors */}
      <div className="flex gap-2 border-b border-black/10 pb-3 text-xs font-medium">
        <button
          onClick={() => setActiveTab('PENDING_REVIEW')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            activeTab === 'PENDING_REVIEW'
              ? 'bg-amber-100 text-amber-900 font-semibold'
              : 'text-editorial-muted hover:text-editorial-text'
          }`}
        >
          Pending Review (ACC) ({items.filter((i) => i.status === 'PENDING_REVIEW').length})
        </button>
        <button
          onClick={() => setActiveTab('DELETION_PENDING')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            activeTab === 'DELETION_PENDING'
              ? 'bg-amber-100 text-amber-900 font-semibold'
              : 'text-editorial-muted hover:text-editorial-text'
          }`}
        >
          Deletion Requests ({items.filter((i) => i.status === 'DELETION_PENDING').length})
        </button>
        <button
          onClick={() => setActiveTab('APPROVED')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            activeTab === 'APPROVED'
              ? 'bg-sage-100 text-sage-900 font-semibold'
              : 'text-editorial-muted hover:text-editorial-text'
          }`}
        >
          Approved Showcase ({items.filter((i) => i.status === 'APPROVED').length})
        </button>
        <button
          onClick={() => setActiveTab('ALL')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            activeTab === 'ALL'
              ? 'bg-black/10 text-editorial-text font-semibold'
              : 'text-editorial-muted hover:text-editorial-text'
          }`}
        >
          All Submissions ({items.length})
        </button>
      </div>

      {filteredItems.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-black/5 text-editorial-muted text-xs">
          No records currently in this moderation queue view.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-black/5 text-left text-xs">
            <thead className="bg-black/[0.02] text-editorial-muted uppercase font-medium tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Author &amp; Patron</th>
                <th className="px-5 py-3.5">Referenced Piece</th>
                <th className="px-5 py-3.5">Narrative &amp; Rating</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Moderation Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 text-editorial-text">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-black/[0.01] transition-colors">
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="font-medium text-editorial-text">{item.authorName}</div>
                    <div className="text-editorial-muted text-[11px]">{item.cityOrRegion}</div>
                    {item.patron?.email && (
                      <div className="text-editorial-muted text-[10px] font-mono mt-0.5">{item.patron.email}</div>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    {item.creationReferenced ? (
                      <span className="font-medium text-sage-600 bg-sage-50 px-2 py-0.5 rounded text-[11px] inline-block border border-sage-200/40">
                        {item.creationReferenced}
                      </span>
                    ) : (
                      <span className="italic text-editorial-muted">General Salon Experience</span>
                    )}
                  </td>

                  <td className="px-5 py-4 max-w-sm">
                    <div className="flex items-center space-x-0.5 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < item.rating ? 'fill-amber-400 text-amber-500' : 'text-black/15'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="font-serif italic text-xs leading-relaxed text-editorial-text line-clamp-3">
                      &ldquo;{item.content}&rdquo;
                    </p>
                    {item.deletionReason && (
                      <div className="mt-1 text-[11px] text-amber-800 bg-amber-50 p-1.5 rounded border border-amber-200">
                        <strong>Retraction Reason:</strong> {item.deletionReason}
                      </div>
                    )}
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap">
                    <Badge variant={statusVariants[item.status]}>{item.status}</Badge>
                    <div className="text-[10px] text-editorial-muted mt-1">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-right whitespace-nowrap space-x-2">
                    {item.status === 'PENDING_REVIEW' && (
                      <>
                        <Button
                          size="sm"
                          variant="sage"
                          onClick={() => handleApprove(item.id)}
                          disabled={actionInProgress === item.id}
                        >
                          <CheckCircle className="w-3.5 h-3.5 mr-1 text-sage-600" />
                          Approve (ACC)
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setRejectionReasonPromptId(item.id)}
                          disabled={actionInProgress === item.id}
                        >
                          <XCircle className="w-3.5 h-3.5 mr-1 text-red-600" />
                          Reject
                        </Button>
                      </>
                    )}

                    {item.status === 'DELETION_PENDING' && (
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleConfirmDeletion(item.id)}
                        disabled={actionInProgress === item.id}
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1" />
                        Confirm Deletion
                      </Button>
                    )}

                    {item.status === 'APPROVED' && (
                      <span className="text-xs text-sage-600 font-medium">Published Live</span>
                    )}

                    {item.status === 'REJECTED' && (
                      <span className="text-xs text-editorial-muted">Archived</span>
                    )}

                    {item.status === 'DELETED' && (
                      <span className="text-xs text-editorial-muted line-through">Purged</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Rejection Prompt Inline Modal */}
      {rejectionReasonPromptId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-black/10">
            <h4 className="font-editorial text-lg text-editorial-text mb-2">Reject Testimonial</h4>
            <p className="text-xs text-editorial-muted mb-4">
              Specify administrative rationale for archival (e.g. duplicate comment, irrelevant narrative):
            </p>
            <textarea
              rows={3}
              value={rejectionNote}
              onChange={(e) => setRejectionNote(e.target.value)}
              placeholder="Administrative note..."
              className="w-full rounded-xl border border-black/10 p-3 text-xs mb-4 focus:outline-none focus:ring-1 focus:ring-sage-500"
            />
            <div className="flex justify-end gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setRejectionReasonPromptId(null);
                  setRejectionNote('');
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                variant="default"
                onClick={() => handleReject(rejectionReasonPromptId)}
                disabled={!rejectionNote.trim()}
              >
                Confirm Rejection
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
