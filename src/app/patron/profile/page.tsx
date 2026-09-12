import React from 'react';
import { redirect } from 'next/navigation';
import { getProfileMetricsAction } from '@/features/profile/actions/get_profile_metrics.action';
import { ProfileHeader } from '@/features/profile/components/profile_header';
import { ProfileInfoCard } from '@/features/profile/components/profile_info_card';
import { SecurityPasswordCard } from '@/features/profile/components/security_password_card';
import { PatronActivityCard } from '@/features/profile/components/patron_activity_card';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Patron Profile & Settings | Maison Valencourt Atelier',
  description: 'Manage your patron particulars, password security, and wishlist vault standing.',
};

export default async function PatronProfilePage() {
  const profile = await getProfileMetricsAction();

  if (!profile || profile.role !== 'PATRON') {
    redirect('/patron/login?callbackUrl=/patron/profile');
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-editorial-muted font-medium block mb-1">
          Patron Vault Registry
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-editorial-text">
          Profile Particulars &amp; Security Settings
        </h1>
        <p className="text-xs sm:text-sm text-editorial-muted mt-1.5 leading-relaxed">
          Manage your verified patron identity, residential district, and confidential access credentials.
        </p>
      </div>

      <ProfileHeader
        name={profile.name}
        email={profile.email}
        role={profile.role}
        cityOrRegion={profile.cityOrRegion}
        createdAt={profile.createdAt}
      />

      {profile.patronMetrics && <PatronActivityCard metrics={profile.patronMetrics} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProfileInfoCard
          initialName={profile.name}
          initialCity={profile.cityOrRegion}
          email={profile.email}
          role={profile.role}
        />
        <SecurityPasswordCard role={profile.role} />
      </div>
    </div>
  );
}
