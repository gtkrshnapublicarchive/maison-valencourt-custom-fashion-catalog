'use client';

import React, { useState } from 'react';
import { WishlistItemSummary } from '@/features/wishlist/contracts/wishlist.dto';
import { WishlistItemCard } from '@/features/wishlist/components/wishlist_item_card';
import { WishlistEmptyState } from '@/features/wishlist/components/wishlist_empty_state';

export interface WishlistGridProps {
  initialItems: WishlistItemSummary[];
}

export function WishlistGrid({ initialItems }: WishlistGridProps) {
  const [items, setItems] = useState<WishlistItemSummary[]>(initialItems);

  const handleRemoved = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  if (items.length === 0) {
    return <WishlistEmptyState />;
  }

  const totalAurum = items.reduce((sum, item) => sum + item.creation.valuationAurum, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-black/10 text-xs text-editorial-muted gap-2">
        <span>
          {items.length} {items.length === 1 ? 'artisan creation' : 'artisan creations'} in your personal vault
        </span>
        <span>
          Cumulative Valuation: <strong className="text-editorial-text">{totalAurum.toLocaleString()} AUR</strong>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <WishlistItemCard
            key={item.id}
            id={item.id}
            creation={item.creation}
            onRemoved={handleRemoved}
          />
        ))}
      </div>
    </div>
  );
}
