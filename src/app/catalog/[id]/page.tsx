import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getGarmentDetailAction } from '@/features/catalog/actions/get_garment_detail.action';
import { GarmentHeroGallery } from '@/features/catalog/components/garment_hero_gallery';
import { GarmentConceptStory } from '@/features/catalog/components/garment_concept_story';
import { GarmentSpecsTable } from '@/features/catalog/components/garment_specs_table';
import { WishlistButton } from '@/features/wishlist/components/wishlist_button';
import { Badge } from '@/core/ui/badge';

interface GarmentDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: GarmentDetailPageProps) {
  const { id } = await params;
  const garment = await getGarmentDetailAction(id);
  if (!garment) return { title: 'Garment Not Found | Maison Valencourt' };
  return {
    title: `${garment.title} (${garment.pieceCode}) | Maison Valencourt Atelier`,
    description: garment.conceptStory.slice(0, 160),
  };
}

export default async function GarmentDetailPage({ params }: GarmentDetailPageProps) {
  const { id } = await params;
  const garment = await getGarmentDetailAction(id);

  if (!garment) {
    notFound();
  }

  const statusLabels = {
    AVAILABLE: 'Available in Salon',
    RESERVED: 'Reserved for Viewing',
    ARCHIVED: 'Permanent Archive',
  };

  const statusVariants: Record<string, 'sage' | 'amber' | 'default'> = {
    AVAILABLE: 'sage',
    RESERVED: 'amber',
    ARCHIVED: 'default',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="text-xs text-editorial-muted mb-8 flex items-center space-x-2">
        <Link href="/catalog" className="hover:text-editorial-text transition-colors">
          Artisan Catalog
        </Link>
        <span>/</span>
        <span>{garment.demographic}</span>
        <span>/</span>
        <span className="text-editorial-text font-medium">{garment.pieceCode}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Multi-Angle Imagery */}
        <div className="lg:col-span-6">
          <GarmentHeroGallery images={garment.imagesList} title={garment.title} />
        </div>

        {/* Right Column: Narrative, Metadata & Actions */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant={statusVariants[garment.availabilityStatus]}>
                {statusLabels[garment.availabilityStatus]}
              </Badge>
              <span className="text-xs font-mono uppercase tracking-widest text-editorial-muted">
                {garment.pieceCode}
              </span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl text-editorial-text mb-2">
              {garment.title}
            </h1>
            <p className="text-xs text-editorial-muted">
              {garment.demographic} &bull; {garment.garmentType}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/[0.02] border border-black/5 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-editorial-muted block">Atelier Valuation</span>
              <span className="font-editorial text-2xl font-medium text-editorial-text">
                {garment.valuationAurum.toLocaleString()} AUR
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-editorial-muted block">Single-Piece Concept</span>
              <span className="text-xs font-medium text-sage-600">Fittings staged by appointment</span>
            </div>
          </div>

          {/* Action Row: Wishlist & Salon Appointment */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href={`/viewing-inquiry?pieceCode=${garment.pieceCode}&title=${encodeURIComponent(garment.title)}`}
              className="flex-1 inline-flex items-center justify-center font-medium bg-obsidian text-white h-12 px-6 rounded-xl hover:bg-obsidian-hover transition-colors text-sm tracking-wide"
            >
              Request Salon Viewing
            </Link>
            <WishlistButton creationId={garment.id} />
          </div>

          {/* Concept Narrative */}
          <GarmentConceptStory
            leadArtisan={garment.leadArtisan}
            conceptStory={garment.conceptStory}
            collectionTheme={garment.collectionTheme}
          />

          {/* Detailed Structural Specifications Table */}
          <GarmentSpecsTable
            constructionType={garment.constructionType}
            lapelStyle={garment.lapelStyle}
            ventStyle={garment.ventStyle}
            handStitchingNotes={garment.handStitchingNotes}
            measurements={garment.measurements}
            fabric={garment.fabric}
          />
        </div>
      </div>
    </div>
  );
}
