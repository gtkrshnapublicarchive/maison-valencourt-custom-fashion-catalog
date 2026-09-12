'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/core/ui/card';
import { Badge } from '@/core/ui/badge';
import { Trash2 } from 'lucide-react';
import { removeWishlistAction } from '@/features/wishlist/actions/remove_wishlist.action';

export interface WishlistItemCardProps {
  id: string;
  creation: {
    id: string;
    pieceCode: string;
    title: string;
    demographic: string;
    leadArtisan: string;
    valuationAurum: number;
    availabilityStatus: 'AVAILABLE' | 'RESERVED' | 'ARCHIVED';
    imagesList: string[];
    fabricName?: string;
  };
  onRemoved: (id: string) => void;
}

export function WishlistItemCard({ id, creation, onRemoved }: WishlistItemCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRemove = async () => {
    setIsDeleting(true);
    const res = await removeWishlistAction(id);
    if (res.success) {
      onRemoved(id);
    } else {
      setIsDeleting(false);
    }
  };

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
    <Card className="flex flex-col sm:flex-row overflow-hidden border border-black/10 hover:shadow-sm transition-all">
      <div className="relative w-full sm:w-48 aspect-[3/4] sm:aspect-auto bg-black/5 flex-shrink-0">
        <Image
          src={creation.imagesList[0] || 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35'}
          alt={creation.title}
          fill
          className="object-cover object-center"
        />
        <div className="absolute top-2 left-2">
          <Badge variant={statusVariants[creation.availabilityStatus]}>
            {statusLabels[creation.availabilityStatus]}
          </Badge>
        </div>
      </div>

      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-editorial-muted">
                {creation.pieceCode}
              </span>
              <h4 className="font-editorial text-xl text-editorial-text font-medium">
                <Link href={`/catalog/${creation.id}`} className="hover:text-obsidian">
                  {creation.title}
                </Link>
              </h4>
              <p className="text-xs text-editorial-muted italic mt-0.5">Conceived by {creation.leadArtisan}</p>
            </div>

            <button
              onClick={handleRemove}
              disabled={isDeleting}
              className="p-1.5 text-editorial-muted hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              title="Remove from Wishlist"
              aria-label="Remove from Wishlist"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-xs">
            <span className="text-editorial-muted">Atelier Valuation:</span>
            <span className="font-medium text-editorial-text">{creation.valuationAurum.toLocaleString()} AUR</span>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <Link
            href={`/viewing-inquiry?pieceCode=${creation.pieceCode}&title=${encodeURIComponent(creation.title)}`}
            className="flex-1 inline-flex items-center justify-center text-xs font-medium uppercase tracking-wider bg-obsidian text-white h-10 px-4 rounded-xl hover:bg-obsidian-hover transition-colors text-center"
          >
            Request Private Viewing
          </Link>
          <Link
            href={`/catalog/${creation.id}`}
            className="inline-flex items-center justify-center text-xs font-medium border border-black/10 bg-white text-editorial-text h-10 px-4 rounded-xl hover:bg-black/5 transition-colors"
          >
            Inspect
          </Link>
        </div>
      </div>
    </Card>
  );
}
