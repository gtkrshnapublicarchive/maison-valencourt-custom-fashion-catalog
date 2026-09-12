import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/features/auth/actions/auth_options';
import { getWishlistAction } from '@/features/wishlist/actions/get_wishlist.action';
import { WishlistGrid } from '@/features/wishlist/components/wishlist_grid';

export const metadata = {
  title: 'Patron Wishlist Vault | Maison Valencourt Atelier',
  description: 'Your authenticated personal vault of saved artisan garments and fabric preferences.',
};

export default async function PatronWishlistPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/patron/login?callbackUrl=/patron/wishlist');
  }

  const items = await getWishlistAction();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mb-10">
        <span className="text-xs uppercase tracking-[0.2em] text-editorial-muted font-medium block mb-2">
          Authenticated Patron Archive
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-editorial-text mb-3">
          Patron Wishlist Vault
        </h1>
        <p className="text-sm text-editorial-muted leading-relaxed">
          Welcome, {session.user.name}. Your personal curation of favored Maison Valencourt garments is preserved
          across sessions and synchronized for fitting suite staging.
        </p>
      </div>

      <WishlistGrid initialItems={items} />
    </div>
  );
}
