import React from 'react';
import Link from 'next/link';
import { Card } from '@/core/ui/card';
import { Layers, CheckSquare, Calendar, Users, ArrowRight } from 'lucide-react';
import { AdminMetrics } from '@/features/profile/actions/get_profile_metrics.action';

export interface AdminOversightCardProps {
  metrics: AdminMetrics;
}

export function AdminOversightCard({ metrics }: AdminOversightCardProps) {
  return (
    <Card className="p-6 sm:p-8 border border-black/10">
      <div className="mb-6">
        <span className="text-xs uppercase font-mono tracking-widest text-editorial-muted block mb-1">
          Executive Portfolio Stature
        </span>
        <h3 className="font-editorial text-xl font-medium text-editorial-text">
          Atelier Oversight &amp; Moderation Health
        </h3>
        <p className="text-xs text-editorial-muted mt-0.5">
          High-level operational metrics under your direct administrative leadership
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-canvas-subtle border border-black/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-editorial-muted mb-2">
            <span className="text-xs">Artisan Creations</span>
            <Layers className="w-4 h-4 text-obsidian" />
          </div>
          <div>
            <p className="font-editorial text-2xl font-medium text-editorial-text">
              {metrics.totalCreationsCount}
            </p>
            <p className="text-[11px] text-editorial-muted mt-0.5">Curated Pieces</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-canvas-subtle border border-black/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-editorial-muted mb-2">
            <span className="text-xs">ACC Queue</span>
            <CheckSquare className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <p className="font-editorial text-2xl font-medium text-editorial-text">
              {metrics.pendingReviewsCount}
            </p>
            <p className="text-[11px] text-amber-700 font-medium mt-0.5">Pending Moderation</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-canvas-subtle border border-black/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-editorial-muted mb-2">
            <span className="text-xs">Salon Inquiries</span>
            <Calendar className="w-4 h-4 text-sage-600" />
          </div>
          <div>
            <p className="font-editorial text-2xl font-medium text-editorial-text">
              {metrics.totalInquiriesCount}
            </p>
            <p className="text-[11px] text-editorial-muted mt-0.5">Total Appointments</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-canvas-subtle border border-black/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-editorial-muted mb-2">
            <span className="text-xs">Registered Patrons</span>
            <Users className="w-4 h-4 text-obsidian" />
          </div>
          <div>
            <p className="font-editorial text-2xl font-medium text-editorial-text">
              {metrics.totalPatronsCount}
            </p>
            <p className="text-[11px] text-editorial-muted mt-0.5">Active Client Vaults</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-2 border-t border-black/5 text-xs">
        <Link
          href="/admin/testimonials"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-black/10 text-editorial-text hover:bg-black/5 transition-colors font-medium"
        >
          <span>Open ACC Queue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/admin/catalog"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-black/10 text-editorial-text hover:bg-black/5 transition-colors font-medium"
        >
          <span>Catalog Inventory</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/admin/inquiries"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-black/10 text-editorial-text hover:bg-black/5 transition-colors font-medium"
        >
          <span>Salon Staging Scheduler</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </Card>
  );
}
