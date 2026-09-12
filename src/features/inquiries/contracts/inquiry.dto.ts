export type InquiryStatus = 'NEW' | 'STAGED' | 'COMPLETED' | 'ARCHIVED';

export interface ViewingInquirySummary {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string | null;
  preferredDate: string;
  preferredTimeSlot: string;
  fittingNotes: string | null;
  status: InquiryStatus;
  fittingSuite: string | null;
  createdAt: Date;
  creation?: {
    id: string;
    pieceCode: string;
    title: string;
  } | null;
  patron?: {
    id: string;
    name: string;
    email: string;
  } | null;
}
