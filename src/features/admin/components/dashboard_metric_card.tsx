import React from 'react';
import { Card } from '@/core/ui/card';

export interface DashboardMetricCardProps {
  title: string;
  value: number | string;
  subtitle: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

export function DashboardMetricCard({
  title,
  value,
  subtitle,
  icon,
  highlight = false,
}: DashboardMetricCardProps) {
  return (
    <Card className={`p-6 border ${highlight ? 'border-amber-300 bg-amber-50/30' : 'border-black/10'}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase font-medium tracking-wider text-editorial-muted">{title}</span>
        <div className="p-2 rounded-xl bg-black/[0.03] text-editorial-text">{icon}</div>
      </div>
      <div className="font-editorial text-3xl font-medium text-editorial-text">{value}</div>
      <p className="text-xs text-editorial-muted mt-1">{subtitle}</p>
    </Card>
  );
}
