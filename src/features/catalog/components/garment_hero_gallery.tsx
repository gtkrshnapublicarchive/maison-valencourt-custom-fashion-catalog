'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export interface GarmentHeroGalleryProps {
  images: string[];
  title: string;
}

export function GarmentHeroGallery({ images, title }: GarmentHeroGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const currentImage = images[selectedIndex] || images[0] || '';

  return (
    <div className="space-y-4">
      <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-black/10 bg-black/5">
        <Image
          src={currentImage}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center transition-all duration-300"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative h-20 w-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                selectedIndex === idx ? 'border-obsidian ring-2 ring-sage-500/30' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={img} alt={`${title} detail ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
