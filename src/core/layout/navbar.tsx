'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Bookmark, Sparkles, User as UserIcon, LogOut, Shield } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isPatron = session?.user?.role === 'PATRON';
  const isAdmin = session?.user?.role === 'ADMIN';

  const navLinks = [
    { href: '/catalog', label: 'Artisan Catalog' },
    { href: '/textiles', label: 'Textile Archive' },
    { href: '/testimonials', label: 'Patron Accolades' },
    { href: '/viewing-inquiry', label: 'Salon Viewing' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-canvas/90 backdrop-blur-md border-b border-black/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand identity */}
        <Link href="/" className="flex flex-col group">
          <span className="font-editorial text-2xl tracking-wider text-editorial-text group-hover:text-obsidian transition-colors">
            MAISON VALENCOURT
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-editorial-muted">
            Atelier Sartorial &bull; Aurelia
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors ${
                  isActive
                    ? 'text-obsidian font-semibold border-b-2 border-obsidian pb-1'
                    : 'text-editorial-muted hover:text-editorial-text'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side session / portal controls */}
        <div className="flex items-center space-x-4">
          {/* Guest state */}
          {!session && (
            <div className="flex items-center space-x-3">
              <Link
                href="/patron/login"
                className="inline-flex items-center text-xs font-medium uppercase tracking-wider text-editorial-text hover:text-obsidian px-3 py-2 rounded-lg transition-colors"
              >
                <UserIcon className="w-3.5 h-3.5 mr-1.5" />
                Patron Portal
              </Link>
              <Link
                href="/viewing-inquiry"
                className="hidden sm:inline-flex items-center justify-center text-xs font-medium uppercase tracking-wider bg-obsidian text-white px-4 py-2.5 rounded-xl hover:bg-obsidian-hover transition-colors"
              >
                Book Viewing
              </Link>
            </div>
          )}

          {/* Patron state */}
          {isPatron && (
            <div className="flex items-center space-x-3">
              <Link
                href="/patron/wishlist"
                className={`inline-flex items-center text-xs font-medium px-3 py-2 rounded-xl border transition-colors ${
                  pathname === '/patron/wishlist'
                    ? 'bg-sage-100 border-sage-500 text-obsidian font-semibold'
                    : 'border-black/10 bg-white text-editorial-text hover:bg-sage-50'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 mr-1.5 text-sage-600" />
                Wishlist Vault
              </Link>
              <Link
                href="/patron/testimonials"
                className={`hidden lg:inline-flex items-center text-xs font-medium px-3 py-2 rounded-xl border transition-colors ${
                  pathname.startsWith('/patron/testimonials')
                    ? 'bg-sage-100 border-sage-500 text-obsidian'
                    : 'border-black/10 bg-white text-editorial-text hover:bg-sage-50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
                My Reviews
              </Link>
              <Link
                href="/patron/profile"
                className={`inline-flex items-center text-xs font-medium px-3 py-2 rounded-xl border transition-colors ${
                  pathname === '/patron/profile'
                    ? 'bg-sage-100 border-sage-500 text-obsidian font-semibold'
                    : 'border-black/10 bg-white text-editorial-text hover:bg-sage-50'
                }`}
              >
                <UserIcon className="w-3.5 h-3.5 mr-1.5 text-sage-600" />
                Profile
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="p-2 rounded-xl text-editorial-muted hover:text-editorial-text hover:bg-black/5 transition-colors"
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Admin state (Strict DOM exclusion: only rendered if isAdmin) */}
          {isAdmin && (
            <div className="flex items-center space-x-3">
              <Link
                href="/admin"
                className="inline-flex items-center text-xs font-medium px-3 py-2 rounded-xl bg-obsidian text-white hover:bg-obsidian-hover transition-colors"
              >
                <Shield className="w-3.5 h-3.5 mr-1.5 text-sage-200" />
                Atelier Director Portal
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="p-2 rounded-xl text-editorial-muted hover:text-editorial-text hover:bg-black/5 transition-colors"
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
