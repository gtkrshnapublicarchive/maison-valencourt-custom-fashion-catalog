'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const DEMOGRAPHICS = [
  { id: 'ALL', label: 'All Collections' },
  { id: 'Gentlemen', label: 'Gentlemen' },
  { id: 'Ladies', label: 'Ladies' },
  { id: 'Universal / Fluid', label: 'Universal / Fluid' },
  { id: 'Youth / Debut', label: 'Youth / Debut' },
  { id: 'Mature / Classical', label: 'Mature / Classical' },
];

export function CatalogFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentDemographic = searchParams.get('demographic') || 'ALL';
  const currentType = searchParams.get('garmentType') || 'ALL';
  const currentTheme = searchParams.get('collectionTheme') || 'ALL';

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'ALL' || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Demographic filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {DEMOGRAPHICS.map((item) => {
          const isSelected = currentDemographic === item.id;
          return (
            <button
              key={item.id}
              onClick={() => updateParam('demographic', item.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                isSelected
                  ? 'bg-obsidian text-white border-obsidian'
                  : 'bg-white text-editorial-text border-black/10 hover:border-black/25'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Secondary dropdown selectors */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={currentType}
          onChange={(e) => updateParam('garmentType', e.target.value)}
          className="rounded-xl border border-black/10 bg-white px-3.5 py-2 text-xs text-editorial-text focus:outline-none focus:ring-1 focus:ring-sage-500"
          aria-label="Filter by Garment Type"
        >
          <option value="ALL">All Garment Silhouettes</option>
          <option value="Tailored Jackets">Tailored Jackets</option>
          <option value="Overcoats">Overcoats</option>
          <option value="Tuxedos / Formalwear">Tuxedos / Formalwear</option>
          <option value="Waistcoats">Waistcoats</option>
          <option value="Structured Trousers">Structured Trousers</option>
        </select>

        <select
          value={currentTheme}
          onChange={(e) => updateParam('collectionTheme', e.target.value)}
          className="rounded-xl border border-black/10 bg-white px-3.5 py-2 text-xs text-editorial-text focus:outline-none focus:ring-1 focus:ring-sage-500"
          aria-label="Filter by Collection Theme"
        >
          <option value="ALL">All Collection Themes</option>
          <option value="Atelier Heritage Series">Atelier Heritage Series</option>
          <option value="Midnight Formal">Midnight Formal</option>
          <option value="Autumn Tweed Expedition">Autumn Tweed Expedition</option>
          <option value="Architectural Minimalist">Architectural Minimalist</option>
        </select>
      </div>
    </div>
  );
}
