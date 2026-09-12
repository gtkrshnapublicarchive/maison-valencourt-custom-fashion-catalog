'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

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
      <select
        value={currentSeason}
        onChange={(e) => updateParam('season', e.target.value)}
        className="rounded-xl border border-black/10 bg-white px-3.5 py-2 text-xs text-editorial-text focus:outline-none focus:ring-1 focus:ring-sage-500"
        aria-label="Filter by Season"
      >
        <option value="ALL">All Seasons &amp; Climates</option>
        <option value="Four Seasons">Four Seasons</option>
        <option value="Autumn / Winter">Autumn / Winter</option>
        <option value="Spring / Summer">Spring / Summer</option>
        <option value="Evening Formal">Evening Formal</option>
      </select>

      <select
        value={currentWeave}
        onChange={(e) => updateParam('weavePattern', e.target.value)}
        className="rounded-xl border border-black/10 bg-white px-3.5 py-2 text-xs text-editorial-text focus:outline-none focus:ring-1 focus:ring-sage-500"
        aria-label="Filter by Weave Pattern"
      >
        <option value="ALL">All Weave Patterns</option>
        <option value="Subtle Herringbone">Subtle Herringbone</option>
        <option value="Brushed Twill">Brushed Twill</option>
        <option value="Rustic Plain Weave">Rustic Plain Weave</option>
        <option value="Jacquard Brocade">Jacquard Brocade</option>
      </select>
    </div>
  );
}
