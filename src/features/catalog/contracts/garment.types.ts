export type Demographic =
  | 'Gentlemen'
  | 'Ladies'
  | 'Universal / Fluid'
  | 'Youth / Debut'
  | 'Mature / Classical';

export type GarmentType =
  | 'Tailored Jackets'
  | 'Structured Trousers'
  | 'Waistcoats'
  | 'Overcoats'
  | 'Tuxedos / Formalwear'
  | 'Hand-Finished Shirts'
  | 'Sculptural Skirts / Gowns';

export type CollectionTheme =
  | 'Atelier Heritage Series'
  | 'Midnight Formal'
  | 'Autumn Tweed Expedition'
  | 'Architectural Minimalist'
  | 'Rare Vintage Cloths';

export type AvailabilityStatus = 'AVAILABLE' | 'RESERVED' | 'ARCHIVED';

export interface GarmentSummary {
  id: string;
  pieceCode: string;
  title: string;
  demographic: string;
  garmentType: string;
  collectionTheme: string;
  leadArtisan: string;
  valuationAurum: number;
  availabilityStatus: AvailabilityStatus;
  images: string[];
  fabricName?: string;
  fabricCode?: string;
}
