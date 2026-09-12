'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Bookmark } from 'lucide-react';
import { Button } from '@/core/ui/button';
import { Modal } from '@/core/ui/modal';
import Link from 'next/link';
import { toggleWishlistAction } from '@/features/wishlist/actions/toggle_wishlist.action';

export interface WishlistButtonProps {
  creationId: string;
  initialIsSaved?: boolean;
}

export function WishlistButton({ creationId, initialIsSaved = false }: WishlistButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleToggle = async () => {
    if (!session?.user) {
      setShowAuthModal(true);
      return;
    }

    setIsLoading(true);
    const res = await toggleWishlistAction(creationId);
    setIsLoading(false);

    if (res.success) {
      setIsSaved(res.isSaved ?? !isSaved);
      router.refresh();
    }
  };

  return (
    <>
      <Button
        variant={isSaved ? 'sage' : 'outline'}
        size="lg"
        onClick={handleToggle}
        isLoading={isLoading}
        className="flex-1"
      >
        <Bookmark className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current text-sage-600' : ''}`} />
        {isSaved ? 'In Patron Wishlist' : 'Save to Wishlist'}
      </Button>

      {/* Guest registration prompt modal */}
      <Modal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title="Patron Authentication Required"
        description="Wishlist curation requires an authenticated patron profile."
      >
        <div className="space-y-4 pt-2">
          <p className="text-xs leading-relaxed text-editorial-muted">
            Register as a Maison Valencourt Patron to curate and persist your favorite designer creations across
            devices, or sign into your existing profile.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href={`/patron/login?callbackUrl=/catalog/${creationId}`}
              className="flex-1 inline-flex items-center justify-center text-xs font-medium bg-obsidian text-white h-10 px-4 rounded-xl hover:bg-obsidian-hover transition-colors"
            >
              Sign In to Profile
            </Link>
            <Link
              href={`/patron/register?callbackUrl=/catalog/${creationId}`}
              className="flex-1 inline-flex items-center justify-center text-xs font-medium border border-black/10 bg-white text-editorial-text h-10 px-4 rounded-xl hover:bg-black/5 transition-colors"
            >
              Register as Patron
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}
