export interface WishlistItemSummary {
  id: string;
  createdAt: Date;
  creation: {
    id: string;
    pieceCode: string;
    title: string;
    demographic: string;
    garmentType: string;
    leadArtisan: string;
    valuationAurum: number;
    availabilityStatus: 'AVAILABLE' | 'RESERVED' | 'ARCHIVED';
    imagesList: string[];
    fabricName?: string;
  };
}
