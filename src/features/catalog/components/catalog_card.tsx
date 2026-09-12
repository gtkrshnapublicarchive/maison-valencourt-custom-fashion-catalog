import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/core/ui/badge';
import { Card } from '@/core/ui/card';

export interface CatalogCardProps {
  id: string;
  pieceCode: string;
  title: string;
  demographic: string;
  garmentType: string;
  leadArtisan: string;
  valuationAurum: number;
  availabilityStatus: 'AVAILABLE' | 'RESERVED' | 'ARCHIVED';
  imageUrl: string;
  fabricName?: string;
}

export function CatalogCard({
  id,
  pieceCode,
  title,
  demographic,
  leadArtisan,
  valuationAurum,
  availabilityStatus,
  imageUrl,
  fabricName,
}: CatalogCardProps) {
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
    <Card className="group overflow-hidden flex flex-col h-full hover:shadow-md transition-all duration-300">
      <Link href={`/catalog/${id}`} className="relative aspect-[3/4] w-full overflow-hidden bg-black/5 block">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <Badge variant={statusVariants[availabilityStatus]}>{statusLabels[availabilityStatus]}</Badge>
          <span className="text-[10px] uppercase font-mono tracking-widest bg-obsidian/80 text-white px-2 py-0.5 rounded backdrop-blur-sm">
            {pieceCode}
          </span>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-editorial-muted mb-1">
            <span>{demographic}</span>
            {fabricName && <span className="truncate max-w-[140px] text-right">{fabricName}</span>}
          </div>
          <Link href={`/catalog/${id}`}>
            <h3 className="font-editorial text-lg text-editorial-text group-hover:text-obsidian transition-colors line-clamp-1">
              {title}
            </h3>
          </Link>
          <p className="text-xs text-editorial-muted mt-1 italic">{leadArtisan}</p>
        </div>

        <div className="pt-4 mt-4 border-t border-black/5 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-editorial-muted block">Atelier Valuation</span>
            <span className="font-medium text-sm text-editorial-text">{valuationAurum.toLocaleString()} AUR</span>
          </div>

          <Link
            href={`/catalog/${id}`}
            className="text-xs font-medium text-obsidian underline underline-offset-4 hover:opacity-75"
          >
            Inspect Creation &rarr;
          </Link>
        </div>
      </div>
    </Card>
  );
}
