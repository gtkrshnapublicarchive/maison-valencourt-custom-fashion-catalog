'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CheckSquare, Layers, Calendar, Settings } from 'lucide-react';

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Director Overview', icon: LayoutDashboard },
    { href: '/admin/testimonials', label: 'Testimonial Moderation (ACC)', icon: CheckSquare },
    { href: '/admin/catalog', label: 'Artisan Garment Catalog', icon: Layers },
    { href: '/admin/inquiries', label: 'Salon Viewing Inquiries', icon: Calendar },
    { href: '/admin/settings', label: 'Atelier System Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-black/10 bg-[#fafaf9] flex flex-col justify-between p-4 flex-shrink-0 min-h-[calc(100vh-4rem)]">
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-obsidian text-white shadow-sm'
                  : 'text-editorial-muted hover:text-editorial-text hover:bg-black/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 bg-white rounded-xl border border-black/5 text-[11px] text-editorial-muted space-y-1">
        <p className="font-medium text-editorial-text">Maison Valencourt</p>
        <p>14 Rue de l&apos;Aube, Aurelia</p>
        <p className="text-[10px] text-sage-600 font-mono">Prisma 6.4 &bull; Next.js 16.3</p>
      </div>
    </aside>
  );
}
