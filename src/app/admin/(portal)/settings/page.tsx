import React from 'react';
import { redirect } from 'next/navigation';
import { getProfileMetricsAction } from '@/features/profile/actions/get_profile_metrics.action';
import { ProfileHeader } from '@/features/profile/components/profile_header';
import { ProfileInfoCard } from '@/features/profile/components/profile_info_card';
import { SecurityPasswordCard } from '@/features/profile/components/security_password_card';
import { AdminOversightCard } from '@/features/profile/components/admin_oversight_card';
import { TenancyDiagnosticsGrid } from '@/features/admin/components/tenancy_diagnostics_grid';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Atelier Settings & Director Profile | Maison Valencourt',
  description: 'Manage executive director particulars, security passphrase, and system operational parameters.',
};

export default async function AdminSettingsPage() {
  const profile = await getProfileMetricsAction();

  if (!profile || profile.role !== 'ADMIN') {
    redirect('/admin/login');
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-editorial-muted font-medium block mb-1">
          Executive Directorate
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-editorial-text">
          Director Particulars &amp; Atelier Settings
        </h1>
        <p className="text-xs sm:text-sm text-editorial-muted mt-1 leading-relaxed">
          Manage administrative signatory standing, passphrase credentials, and sovereign system parameters.
        </p>
      </div>

      <ProfileHeader
        name={profile.name}
        email={profile.email}
        role={profile.role}
        cityOrRegion={profile.cityOrRegion}
        createdAt={profile.createdAt}
      />

      {profile.adminMetrics && <AdminOversightCard metrics={profile.adminMetrics} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProfileInfoCard
          initialName={profile.name}
          initialCity={profile.cityOrRegion}
          email={profile.email}
          role={profile.role}
        />
        <SecurityPasswordCard role={profile.role} />
      </div>

      <TenancyDiagnosticsGrid />
    </div>
  );
}
