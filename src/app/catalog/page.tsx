import React, { Suspense } from 'react';
import { getCatalogCreationsAction } from '@/features/catalog/actions/get_catalog_creations.action';
import { CatalogCard } from '@/features/catalog/components/catalog_card';
import { CatalogFilterBar } from '@/features/catalog/components/catalog_filter_bar';

export const metadata = {
  title: 'Artisan Catalog | Maison Valencourt Atelier',
  description: 'Original artisan custom garments designed and handcrafted by Maison Valencourt master tailors.',
};

export const dynamic = 'force-dynamic';

interface CatalogPageProps {
  searchParams: Promise<{
    demographic?: string;
    garmentType?: string;
    collectionTheme?: string;
    search?: string;
  }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const resolvedParams = await searchParams;
  const creations = await getCatalogCreationsAction(resolvedParams);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Editorial Header */}
      <div className="max-w-2xl mb-10">
        <span className="text-xs uppercase tracking-[0.2em] text-editorial-muted font-medium block mb-2">
          Original Atelier Showcase
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-medium tracking-tight text-editorial-text mb-4">
          Artisan Designer Creations
        </h1>
        <p className="text-sm sm:text-base text-editorial-muted leading-relaxed">
          Original bespoke garments independently conceptualized, drafted, and hand-canvased by our resident master
          tailors. Singular concept pieces available for private salon viewing and acquisition.
        </p>
      </div>

      <Suspense fallback={<div className="text-xs text-editorial-muted">Loading collections...</div>}>
        <CatalogFilterBar />
      </Suspense>

      {creations.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-white border border-black/5">
          <p className="text-editorial-muted text-sm">
            No artisan creations match the selected filters. Explore other collections or reset filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {creations.map((item) => (
            <CatalogCard
              key={item.id}
              id={item.id}
              pieceCode={item.pieceCode}
              title={item.title}
              demographic={item.demographic}
              garmentType={item.garmentType}
              leadArtisan={item.leadArtisan}
              valuationAurum={item.valuationAurum}
              availabilityStatus={item.availabilityStatus}
              imageUrl={item.imagesList[0] || 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35'}
              fabricName={item.fabric?.name}
            />
          ))}
        </div>
      )}
    </div>
  );
}
