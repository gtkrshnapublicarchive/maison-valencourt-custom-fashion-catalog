'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/core/ui/card';
import { Input } from '@/core/ui/input';
import { Button } from '@/core/ui/button';
import { updateProfileAction } from '@/features/profile/actions/update_profile.action';
import { CheckCircle2, UserCheck } from 'lucide-react';

export interface ProfileInfoCardProps {
  initialName: string;
  initialCity: string | null;
  email: string;
  role: 'ADMIN' | 'PATRON';
}

export function ProfileInfoCard({ initialName, initialCity, email, role }: ProfileInfoCardProps) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [cityOrRegion, setCityOrRegion] = useState(initialCity || '');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isDirector = role === 'ADMIN';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    const res = await updateProfileAction({
      name,
      cityOrRegion: cityOrRegion.trim() ? cityOrRegion.trim() : null,
    });

    setIsLoading(false);

    if (res.success) {
      setSuccess(true);
      router.refresh();
      setTimeout(() => setSuccess(false), 4000);
    } else {
      setError(res.error || 'Failed to update profile.');
    }
  };

  return (
    <Card className="p-6 sm:p-8 border border-black/10">
      <div className="flex items-center gap-2.5 mb-6">
        <UserCheck className="w-5 h-5 text-sage-600" />
        <div>
          <h3 className="font-editorial text-xl font-medium text-editorial-text">
            {isDirector ? 'Director Identity Credentials' : 'Patron Personal Particulars'}
          </h3>
          <p className="text-xs text-editorial-muted mt-0.5">
            {isDirector
              ? 'Update executive signatory name and official atelier jurisdiction'
              : 'Update your registered salon name and district residence'}
          </p>
        </div>
      </div>

      {success && (
        <div className="mb-5 p-3.5 rounded-xl bg-sage-50 border border-sage-200 text-xs text-sage-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-sage-600 flex-shrink-0" />
          <span>Profile particulars successfully preserved in atelier records.</span>
        </div>
      )}

      {error && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label={isDirector ? 'Director Signatory Name' : 'Full Name'}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label={isDirector ? 'Official District / Jurisdiction' : 'City / Residential District'}
            type="text"
            value={cityOrRegion}
            onChange={(e) => setCityOrRegion(e.target.value)}
            placeholder="e.g. Upper Promenade, Aurelia"
          />
        </div>

        <Input
          label="Registered Communication Address"
          type="email"
          value={email}
          disabled
          hint="Permanent identity address. Contact atelier archival registry for address modifications."
        />

        <div className="pt-2 flex justify-end">
          <Button type="submit" variant="default" isLoading={isLoading} className="w-full sm:w-auto">
            Save Particulars
          </Button>
        </div>
      </form>
    </Card>
  );
}
