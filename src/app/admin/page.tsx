import React from 'react';
import Link from 'next/link';
import { getDashboardStatsAction } from '@/features/admin/actions/get_dashboard_stats.action';
import { DashboardMetricCard } from '@/features/admin/components/dashboard_metric_card';
import { Card } from '@/core/ui/card';
import { CheckSquare, Calendar, Layers, Users, ArrowUpRight } from 'lucide-react';

export default async function AdminOverviewPage() {
  const stats = await getDashboardStatsAction();

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-editorial-muted font-medium block mb-1">
          Executive Dashboard
        </span>
        <h1 className="font-editorial text-3xl font-medium text-editorial-text">
          Atelier Director Console
        </h1>
        <p className="text-xs sm:text-sm text-editorial-muted mt-1">
          Operational telemetry and moderation pipeline for Maison Valencourt at 14 Rue de l&apos;Aube.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <DashboardMetricCard
          title="Pending Testimonials"
          value={stats.pendingTestimonials}
          subtitle={`${stats.approvedTestimonials} approved / live`}
          icon={<CheckSquare className="w-5 h-5" />}
          highlight={stats.pendingTestimonials > 0}
        />
        <DashboardMetricCard
          title="New Salon Inquiries"
          value={stats.newInquiries}
          subtitle="Fitting suite appointments"
          icon={<Calendar className="w-5 h-5" />}
          highlight={stats.newInquiries > 0}
        />
        <DashboardMetricCard
          title="Artisan Creations"
          value={stats.totalCreations}
          subtitle={`${stats.availableCreations} available in salon`}
          icon={<Layers className="w-5 h-5" />}
        />
        <DashboardMetricCard
          title="Registered Patrons"
          value={stats.totalPatrons}
          subtitle="Authenticated client vault"
          icon={<Users className="w-5 h-5" />}
        />
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 flex flex-col justify-between border border-black/10">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-sage-600 block mb-1">
              ACC Workflow
            </span>
            <h3 className="font-editorial text-xl text-editorial-text mb-2">Testimonial Queue</h3>
            <p className="text-xs text-editorial-muted leading-relaxed">
              Review and moderate pending client accolades. Approve for public showcase, reject, or confirm deletion
              requests.
            </p>
          </div>
          <Link
            href="/admin/testimonials"
            className="mt-5 inline-flex items-center text-xs font-medium text-obsidian underline underline-offset-4 hover:opacity-80"
          >
            Open Moderation Queue ({stats.pendingTestimonials + stats.deletionPendingTestimonials}){' '}
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </Card>

        <Card className="p-6 flex flex-col justify-between border border-black/10">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-sage-600 block mb-1">
              Salon Scheduling
            </span>
            <h3 className="font-editorial text-xl text-editorial-text mb-2">Viewing Inquiries</h3>
            <p className="text-xs text-editorial-muted leading-relaxed">
              Coordinate fitting suite assignments (Suites A &amp; B) and stage requested artisan creations for patron visits.
            </p>
          </div>
          <Link
            href="/admin/inquiries"
            className="mt-5 inline-flex items-center text-xs font-medium text-obsidian underline underline-offset-4 hover:opacity-80"
          >
            Manage Viewing Inquiries ({stats.newInquiries}) <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </Card>

        <Card className="p-6 flex flex-col justify-between border border-black/10">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-sage-600 block mb-1">
              Artisan Catalog
            </span>
            <h3 className="font-editorial text-xl text-editorial-text mb-2">Garment Availability</h3>
            <p className="text-xs text-editorial-muted leading-relaxed">
              Toggle piece availability between &ldquo;Available in Salon&rdquo;, &ldquo;Reserved for Viewing&rdquo;, and
              &ldquo;Permanent Archive&rdquo;.
            </p>
          </div>
          <Link
            href="/admin/catalog"
            className="mt-5 inline-flex items-center text-xs font-medium text-obsidian underline underline-offset-4 hover:opacity-80"
          >
            Review Catalog Inventory <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </Card>
      </div>
    </div>
  );
}
