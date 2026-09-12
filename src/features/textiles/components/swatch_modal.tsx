'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Modal } from '@/core/ui/modal';
import { Badge } from '@/core/ui/badge';

export interface SwatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  fabric: {
    code: string;
    name: string;
    millName: string;
    composition: string;
    weightGsm: number;
    season: string;
    weavePattern: string;
    sourcingRationale: string;
    swatchImageUrl: string;
    creations?: { id: string; pieceCode: string; title: string }[];
  } | null;
}

export function SwatchModal({ isOpen, onClose, fabric }: SwatchModalProps) {
  if (!fabric) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={fabric.name} description={`Provenance: ${fabric.millName}`}>
      <div className="space-y-5">
        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-black/10 bg-black/5">
          <Image
            src={fabric.swatchImageUrl}
            alt={fabric.name}
            fill
            className="object-cover object-center"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="obsidian">{fabric.code}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs bg-black/[0.02] p-3 rounded-xl border border-black/5">
          <div>
            <span className="text-editorial-muted block uppercase tracking-wider text-[10px]">Composition</span>
            <span className="font-medium text-editorial-text">{fabric.composition}</span>
          </div>
          <div>
            <span className="text-editorial-muted block uppercase tracking-wider text-[10px]">Weight</span>
            <span className="font-medium text-editorial-text">{fabric.weightGsm} gsm</span>
          </div>
          <div>
            <span className="text-editorial-muted block uppercase tracking-wider text-[10px]">Weave Pattern</span>
            <span className="font-medium text-editorial-text">{fabric.weavePattern}</span>
          </div>
          <div>
            <span className="text-editorial-muted block uppercase tracking-wider text-[10px]">Season</span>
            <span className="font-medium text-editorial-text">{fabric.season}</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-wider font-semibold text-editorial-muted mb-1.5">
            Designer Sourcing Rationale
          </h4>
          <p className="text-xs leading-relaxed text-editorial-text font-serif italic bg-sage-50/50 p-3 rounded-xl border border-sage-200/50">
            {fabric.sourcingRationale}
          </p>
        </div>

        {fabric.creations && fabric.creations.length > 0 && (
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-editorial-muted mb-2">
              Garments Cut from this Cloth
            </h4>
            <div className="space-y-1.5">
              {fabric.creations.map((creation) => (
                <Link
                  key={creation.id}
                  href={`/catalog/${creation.id}`}
                  className="flex items-center justify-between text-xs p-2 rounded-lg bg-white border border-black/5 hover:border-black/20 transition-colors"
                >
                  <span className="font-medium text-editorial-text">{creation.title}</span>
                  <span className="text-[10px] font-mono text-editorial-muted">{creation.pieceCode}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
