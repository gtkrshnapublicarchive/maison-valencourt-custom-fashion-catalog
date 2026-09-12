'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Select } from '@/core/ui/select';

const SEASONS = [
  { value: 'ALL', label: 'All Seasons & Climates' },
  { value: 'Four Seasons', label: 'Four Seasons' },
  { value: 'Autumn / Winter', label: 'Autumn / Winter' },
  { value: 'Spring / Summer', label: 'Spring / Summer' },
  { value: 'Evening Formal', label: 'Evening Formal' },
];

const WEAVE_PATTERNS = [
  { value: 'ALL', label: 'All Weave Patterns' },
  { value: 'Subtle Herringbone', label: 'Subtle Herringbone' },
  { value: 'Brushed Twill', label: 'Brushed Twill' },
  { value: 'Rustic Plain Weave', label: 'Rustic Plain Weave' },
  { value: 'Jacquard Brocade', label: 'Jacquard Brocade' },
];

export function TextileFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSeason = searchParams.get('season') || 'ALL';
  const currentWeave = searchParams.get('weavePattern') || 'ALL';

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'ALL' || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/textiles?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mb-8">
      <Select
        value={currentSeason}
        onChange={(val) => updateParam('season', val)}
        options={SEASONS}
        ariaLabel="Filter by Season"
      />

      <Select
        value={currentWeave}
        onChange={(val) => updateParam('weavePattern', val)}
        options={WEAVE_PATTERNS}
        ariaLabel="Filter by Weave Pattern"
      />
    </div>
  );
}
