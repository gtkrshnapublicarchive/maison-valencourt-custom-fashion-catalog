import React from 'react';
import Link from 'next/link';
import { Card } from '@/core/ui/card';
import { Bookmark, Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { PatronMetrics } from '@/features/profile/actions/get_profile_metrics.action';

export interface PatronActivityCardProps {
  metrics: PatronMetrics;
}

export function PatronActivityCard({ metrics }: PatronActivityCardProps) {
  return (
    <Card className="p-6 sm:p-8 border border-black/10">
      <div className="mb-6">
        <span className="text-xs uppercase font-mono tracking-widest text-editorial-muted block mb-1">
          Patron Activity Portfolio
        </span>
        <h3 className="font-editorial text-xl font-medium text-editorial-text">
          Atelier Engagements &amp; Vault Standing
        </h3>
        <p className="text-xs text-editorial-muted mt-0.5">
          Real-time record of your curated wishlist vault, submitted accolades, and private fittings
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-canvas-subtle border border-black/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-editorial-muted mb-2">
            <span className="text-xs">Wishlist Vault</span>
            <Bookmark className="w-4 h-4 text-sage-600" />
          </div>
          <div>
            <p className="font-editorial text-2xl font-medium text-editorial-text">
              {metrics.wishlistCount} {metrics.wishlistCount === 1 ? 'Piece' : 'Pieces'}
            </p>
            <p className="text-[11px] text-editorial-muted mt-0.5">
              Valuation: {metrics.wishlistTotalAurum.toLocaleString()} AUR
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-canvas-subtle border border-black/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-editorial-muted mb-2">
            <span className="text-xs">Sartorial Accolades</span>
            <Sparkles className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <p className="font-editorial text-2xl font-medium text-editorial-text">
              {metrics.reviewsCount} {metrics.reviewsCount === 1 ? 'Review' : 'Reviews'}
            </p>
            <p className="text-[11px] text-sage-600 font-medium mt-0.5">
              {metrics.reviewsApprovedCount} Approved in Gazette
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-canvas-subtle border border-black/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-editorial-muted mb-2">
            <span className="text-xs">Salon Viewings</span>
            <Calendar className="w-4 h-4 text-obsidian" />
          </div>
          <div>
            <p className="font-editorial text-2xl font-medium text-editorial-text">
              {metrics.inquiriesCount} {metrics.inquiriesCount === 1 ? 'Booking' : 'Bookings'}
            </p>
            <p className="text-[11px] text-editorial-muted mt-0.5">
              Suite A / B Reservations
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-2 border-t border-black/5 text-xs">
        <Link
          href="/patron/wishlist"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-black/10 text-editorial-text hover:bg-black/5 transition-colors font-medium"
        >
          <span>Open Wishlist Vault</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/patron/testimonials"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-black/10 text-editorial-text hover:bg-black/5 transition-colors font-medium"
        >
          <span>Manage Accolades</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/viewing-inquiry"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-obsidian text-white hover:bg-obsidian-hover transition-colors font-medium"
        >
          <span>Book Fitting Suite</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </Card>
  );
}
