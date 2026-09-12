'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { SwatchModal } from '@/features/textiles/components/swatch_modal';

export interface TextileCardProps {
  id: string;
  code: string;
  name: string;
  millName: string;
  composition: string;
  weightGsm: number;
  season: string;
  weavePattern: string;
  sourcingRationale: string;
  swatchImageUrl: string;
  creationsCount: number;
  creations?: { id: string; pieceCode: string; title: string }[];
}

export function TextileCard(props: TextileCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card
        id={props.code}
        className="group overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5">
          <Image
            src={props.swatchImageUrl}
            alt={props.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="obsidian">{props.code}</Badge>
          </div>
          <div className="absolute bottom-3 right-3">
            <span className="text-[10px] bg-white/90 text-obsidian px-2 py-0.5 rounded-full font-medium shadow-sm backdrop-blur-sm">
              {props.weightGsm} gsm
            </span>
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-editorial-muted mb-1">
              <span>{props.millName}</span>
              <span>{props.season}</span>
            </div>
            <h3 className="font-editorial text-lg text-editorial-text group-hover:text-obsidian transition-colors">
              {props.name}
            </h3>
            <p className="text-xs text-editorial-muted mt-1">{props.composition}</p>
          </div>

          <div className="pt-4 mt-4 border-t border-black/5 flex items-center justify-between">
            <span className="text-xs text-editorial-muted">
              {props.creationsCount} atelier {props.creationsCount === 1 ? 'creation' : 'creations'}
            </span>
            <span className="text-xs font-medium text-obsidian underline underline-offset-4">
              Magnify Swatch &rarr;
            </span>
          </div>
        </div>
      </Card>

      <SwatchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} fabric={props} />
    </>
  );
}
