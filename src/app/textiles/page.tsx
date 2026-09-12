import React, { Suspense } from 'react';
import { getTextilesAction } from '@/features/textiles/actions/get_textiles.action';
import { TextileCard } from '@/features/textiles/components/textile_card';
import { TextileFilterBar } from '@/features/textiles/components/textile_filter_bar';

export const metadata = {
  title: 'Textile Archive | Maison Valencourt Atelier',
  description: 'Rare wools, vintage deadstock cloths, and cashmere weaves curated for Maison Valencourt artisan creations.',
};

interface TextilesPageProps {
  searchParams: Promise<{
    season?: string;
    weavePattern?: string;
  }>;
}

export default async function TextilesPage({ searchParams }: TextilesPageProps) {
  const resolvedParams = await searchParams;
  const fabrics = await getTextilesAction(resolvedParams);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Editorial Header */}
      <div className="max-w-2xl mb-10">
        <span className="text-xs uppercase tracking-[0.2em] text-editorial-muted font-medium block mb-2">
          Cloth Provenance &amp; Mill Archive
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-medium tracking-tight text-editorial-text mb-4">
          Textile &amp; Weave Archive
        </h1>
        <p className="text-sm sm:text-base text-editorial-muted leading-relaxed">
          The structural soul of tailoring begins with the cloth. Explore our curated bolts of rare fibers, salvaged
          heritage deadstock weaves, and historic mill provenance.
        </p>
      </div>

      <Suspense fallback={<div className="text-xs text-editorial-muted">Loading textile filters...</div>}>
        <TextileFilterBar />
      </Suspense>

      {fabrics.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-white border border-black/5">
          <p className="text-editorial-muted text-sm">
            No cloth bolts found for the selected criteria. Reset filters to view full textile archive.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {fabrics.map((fabric) => (
            <TextileCard
              key={fabric.id}
              id={fabric.id}
              code={fabric.code}
              name={fabric.name}
              millName={fabric.millName}
              composition={fabric.composition}
              weightGsm={fabric.weightGsm}
              season={fabric.season}
              weavePattern={fabric.weavePattern}
              sourcingRationale={fabric.sourcingRationale}
              swatchImageUrl={fabric.swatchImageUrl}
              creationsCount={fabric.creationsCount}
              creations={fabric.creations}
            />
          ))}
        </div>
      )}
    </div>
  );
}
