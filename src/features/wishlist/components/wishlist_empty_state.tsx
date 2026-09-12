import React from 'react';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';
import { Card } from '@/core/ui/card';

export function WishlistEmptyState() {
  return (
    <Card className="p-16 text-center max-w-lg mx-auto border border-black/5">
      <div className="inline-flex p-3.5 rounded-full bg-sage-100 text-sage-600 mb-4">
        <Bookmark className="w-6 h-6" />
      </div>
      <h3 className="font-editorial text-2xl font-medium text-editorial-text mb-2">
        Your Wishlist Vault is Empty
      </h3>
      <p className="text-xs sm:text-sm text-editorial-muted leading-relaxed mb-6">
        Pin bespoke tailored jackets, overcoats, and evening formalwear from the artisan catalog to preserve your
        favored pieces and pre-stage them for private salon viewings.
      </p>
      <Link
        href="/catalog"
        className="inline-flex items-center justify-center font-medium bg-obsidian text-white h-11 px-6 rounded-xl hover:bg-obsidian-hover transition-colors text-xs tracking-wider uppercase"
      >
        Explore Artisan Creations
      </Link>
    </Card>
  );
}
