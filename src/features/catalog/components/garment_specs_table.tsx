import React from 'react';
import Link from 'next/link';
import { Card } from '@/core/ui/card';

export interface GarmentSpecsProps {
  constructionType: string;
  lapelStyle: string;
  ventStyle: string;
  handStitchingNotes: string;
  measurements: string;
  fabric?: {
    id: string;
    code: string;
    name: string;
    millName: string;
    composition: string;
    weightGsm: number;
  } | null;
}

export function GarmentSpecsTable({
  constructionType,
  lapelStyle,
  ventStyle,
  handStitchingNotes,
  measurements,
  fabric,
}: GarmentSpecsProps) {
  const specs = [
    { label: 'Canvasing & Build', value: constructionType },
    { label: 'Lapel Architecture', value: lapelStyle },
    { label: 'Vent Geometry', value: ventStyle },
    { label: 'Hand-Stitching Highlights', value: handStitchingNotes },
    { label: 'Measured Dimensions', value: measurements },
  ];

  return (
    <Card className="p-6">
      <h3 className="font-editorial text-lg font-medium text-editorial-text mb-4 pb-2 border-b border-black/5">
        Structural Sartorial Anatomy
      </h3>

      <dl className="divide-y divide-black/5 text-sm">
        {specs.map((spec) => (
          <div key={spec.label} className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-xs uppercase font-medium tracking-wider text-editorial-muted">{spec.label}</dt>
            <dd className="mt-1 sm:mt-0 sm:col-span-2 text-editorial-text">{spec.value}</dd>
          </div>
        ))}

        {fabric && (
          <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-xs uppercase font-medium tracking-wider text-editorial-muted">Primary Textile Bolt</dt>
            <dd className="mt-1 sm:mt-0 sm:col-span-2 text-editorial-text">
              <span className="font-medium block">{fabric.name}</span>
              <span className="text-xs text-editorial-muted block mt-0.5">
                {fabric.millName} &bull; {fabric.composition} &bull; {fabric.weightGsm} gsm
              </span>
              <Link
                href={`/textiles#${fabric.code}`}
                className="text-xs text-obsidian underline underline-offset-2 mt-1 inline-block hover:text-sage-600"
              >
                Inspect textile swatch in archive &rarr;
              </Link>
            </dd>
          </div>
        )}
      </dl>
    </Card>
  );
}
