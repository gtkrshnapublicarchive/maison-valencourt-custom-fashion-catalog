'use client';

import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Shield, LogOut } from 'lucide-react';

export function AdminHeader() {
  const { data: session } = useSession();

  return (
    <header className="h-16 border-b border-black/10 bg-white px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="p-1.5 rounded-lg bg-obsidian text-white">
          <Shield className="w-4 h-4 text-sage-200" />
        </div>
        <div>
          <span className="font-editorial text-base font-medium text-editorial-text block leading-none">
            Maison Valencourt Back-Office
          </span>
          <span className="text-[10px] tracking-wider uppercase text-editorial-muted">
            Atelier Director Console
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <div className="text-xs font-medium text-editorial-text">{session?.user?.name || 'Marcus Valencourt'}</div>
          <div className="text-[10px] text-editorial-muted">{session?.user?.email}</div>
        </div>

        <Link
          href="/"
          className="text-xs font-medium text-editorial-muted hover:text-editorial-text border border-black/10 px-3 py-1.5 rounded-lg hover:bg-black/5 transition-colors"
        >
          View Public Site
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="p-1.5 text-editorial-muted hover:text-editorial-text hover:bg-black/5 rounded-lg transition-colors"
          title="Sign Out"
          aria-label="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
