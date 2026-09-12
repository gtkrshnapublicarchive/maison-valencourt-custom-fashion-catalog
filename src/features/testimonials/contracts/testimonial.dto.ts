export type TestimonialStatus =
  | 'PENDING_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'DELETION_PENDING'
  | 'DELETED';

export interface TestimonialSummary {
  id: string;
  patronId: string;
  authorName: string;
  cityOrRegion: string;
  creationReferenced: string | null;
  rating: number;
  content: string;
  status: TestimonialStatus;
  rejectionReason: string | null;
  deletionReason: string | null;
  reviewedAt: Date | null;
  reviewedById: string | null;
  createdAt: Date;
  patron?: {
    name: string;
    email: string;
  };
}
