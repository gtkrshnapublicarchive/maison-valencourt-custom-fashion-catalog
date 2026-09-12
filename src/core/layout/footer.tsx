import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-black/[0.08] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2 space-y-4">
            <span className="font-editorial text-2xl tracking-wider text-editorial-text block">
              MAISON VALENCOURT
            </span>
            <p className="text-sm text-editorial-muted max-w-md leading-relaxed">
              An artisan tailoring house dedicated to structural elegance, hand-canvased construction, and vintage
              textile provenance. Curated designer showcase for singular sartorial creations.
            </p>
            <div className="pt-2 text-xs text-editorial-muted space-y-1">
              <p>14 Rue de l&apos;Aube, Grand District, Aurelia City</p>
              <p>Tuesday - Saturday: 10:00 - 19:00 (Sunday &amp; Monday: Workshop Drafting Only)</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-editorial-text">Artisan Exhibition</h4>
            <ul className="space-y-2 text-sm text-editorial-muted">
              <li>
                <Link href="/catalog" className="hover:text-editorial-text transition-colors">
                  Artisan Creations
                </Link>
              </li>
              <li>
                <Link href="/textiles" className="hover:text-editorial-text transition-colors">
                  Textile Archive
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-editorial-text transition-colors">
                  Patron Accolades
                </Link>
              </li>
              <li>
                <Link href="/viewing-inquiry" className="hover:text-editorial-text transition-colors">
                  Private Salon Inquiries
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-editorial-text">Patron Services</h4>
            <ul className="space-y-2 text-sm text-editorial-muted">
              <li>
                <Link href="/patron/login" className="hover:text-editorial-text transition-colors">
                  Patron Portal
                </Link>
              </li>
              <li>
                <Link href="/patron/register" className="hover:text-editorial-text transition-colors">
                  Register as Patron
                </Link>
              </li>
              <li>
                <Link href="/patron/wishlist" className="hover:text-editorial-text transition-colors">
                  Wishlist Vault
                </Link>
              </li>
              <li>
                <Link href="/patron/testimonials/new" className="hover:text-editorial-text transition-colors">
                  Submit Testimonial
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 mt-12 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between text-xs text-editorial-muted gap-4">
          <p>&copy; {new Date().getFullYear()} Maison Valencourt Atelier. All rights reserved.</p>
          <p className="text-center sm:text-right max-w-md">
            Fictional luxury fashion case study. All brand names, locations, fabrics, and valuations in Aurum (AUR) are
            strictly fictional constructs.
          </p>
        </div>
      </div>
    </footer>
  );
}
