import React from 'react';
import { Badge } from '@/core/ui/badge';
import { Card } from '@/core/ui/card';
import { ShieldCheck, Sparkles, Calendar } from 'lucide-react';

export interface ProfileHeaderProps {
  name: string;
  email: string;
  role: 'ADMIN' | 'PATRON';
  cityOrRegion: string | null;
  createdAt: Date;
}

export function ProfileHeader({ name, email, role, cityOrRegion, createdAt }: ProfileHeaderProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(createdAt));

  const isDirector = role === 'ADMIN';

  return (
    <Card className="p-6 sm:p-8 border border-black/10 bg-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-obsidian text-white flex items-center justify-center font-editorial text-2xl font-medium tracking-wider shadow-sm flex-shrink-0">
            {initials}
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-editorial-text">
                {name}
              </h2>
              <Badge variant={isDirector ? 'obsidian' : 'sage'}>
                {isDirector ? 'Atelier Director' : 'Verified Patron'}
              </Badge>
            </div>

            <p className="text-xs text-editorial-muted font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-sage-600" />
              <span>{email}</span>
              {cityOrRegion && <span>&bull; {cityOrRegion}</span>}
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right border-t sm:border-t-0 pt-4 sm:pt-0 w-full sm:w-auto border-black/5">
          <span className="text-[10px] uppercase font-mono tracking-widest text-editorial-muted block">
            {isDirector ? 'Commissioned Stature' : 'Patron Standing'}
          </span>
          <p className="text-xs font-medium text-editorial-text mt-0.5 flex items-center sm:justify-end gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-sage-600" />
            <span>Active since {formattedDate}</span>
          </p>
        </div>
      </div>
    </Card>
  );
}
