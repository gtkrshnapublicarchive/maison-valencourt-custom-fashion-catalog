'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Select } from '@/core/ui/select';

const DEMOGRAPHICS = [
  { id: 'ALL', label: 'All Collections' },
  { id: 'Gentlemen', label: 'Gentlemen' },
  { id: 'Ladies', label: 'Ladies' },
  { id: 'Universal / Fluid', label: 'Universal / Fluid' },
  { id: 'Youth / Debut', label: 'Youth / Debut' },
  { id: 'Mature / Classical', label: 'Mature / Classical' },
];

const GARMENT_TYPES = [
  { value: 'ALL', label: 'All Garment Silhouettes' },
  { value: 'Tailored Jackets', label: 'Tailored Jackets' },
  { value: 'Overcoats', label: 'Overcoats' },
  { value: 'Tuxedos / Formalwear', label: 'Tuxedos / Formalwear' },
  { value: 'Waistcoats', label: 'Waistcoats' },
  { value: 'Structured Trousers', label: 'Structured Trousers' },
];

const COLLECTION_THEMES = [
  { value: 'ALL', label: 'All Collection Themes' },
  { value: 'Atelier Heritage Series', label: 'Atelier Heritage Series' },
  { value: 'Midnight Formal', label: 'Midnight Formal' },
  { value: 'Autumn Tweed Expedition', label: 'Autumn Tweed Expedition' },
  { value: 'Architectural Minimalist', label: 'Architectural Minimalist' },
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
        <Select
          value={currentType}
          onChange={(val) => updateParam('garmentType', val)}
          options={GARMENT_TYPES}
          ariaLabel="Filter by Garment Type"
        />

        <Select
          value={currentTheme}
          onChange={(val) => updateParam('collectionTheme', val)}
          options={COLLECTION_THEMES}
          ariaLabel="Filter by Collection Theme"
        />
      </div>
    </div>
  );
}
