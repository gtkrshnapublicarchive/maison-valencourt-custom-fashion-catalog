'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AvailabilityStatus } from '@prisma/client';
import { updateGarmentStatusAction } from '@/features/admin/actions/manage_catalog.action';
import { Badge } from '@/core/ui/badge';
import { Select } from '@/core/ui/select';

const STATUS_OPTIONS = [
  { value: 'AVAILABLE', label: 'Available in Salon' },
  { value: 'RESERVED', label: 'Reserved for Viewing' },
  { value: 'ARCHIVED', label: 'Permanent Archive' },
];

export interface CatalogManagementTableProps {
  initialCreations: {
    id: string;
    pieceCode: string;
    title: string;
    demographic: string;
    garmentType: string;
    leadArtisan: string;
    valuationAurum: number;
    availabilityStatus: AvailabilityStatus;
  }[];
}

export function CatalogManagementTable({ initialCreations }: CatalogManagementTableProps) {
  const [creations, setCreations] = useState(initialCreations);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusToggle = async (id: string, newStatus: AvailabilityStatus) => {
    setUpdatingId(id);
    const res = await updateGarmentStatusAction(id, newStatus);
    setUpdatingId(null);

    if (res.success) {
      setCreations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, availabilityStatus: newStatus } : c))
      );
    }
  };

  const statusVariants: Record<AvailabilityStatus, 'sage' | 'amber' | 'default'> = {
    AVAILABLE: 'sage',
    RESERVED: 'amber',
    ARCHIVED: 'default',
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-black/5 text-left text-xs">
        <thead className="bg-black/[0.02] text-editorial-muted uppercase font-medium tracking-wider">
          <tr>
            <th className="px-5 py-3.5">Piece Code &amp; Title</th>
            <th className="px-5 py-3.5">Demographic / Category</th>
            <th className="px-5 py-3.5">Lead Artisan</th>
            <th className="px-5 py-3.5">Valuation</th>
            <th className="px-5 py-3.5">Current Status</th>
            <th className="px-5 py-3.5 text-right">Availability Toggle</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/5 text-editorial-text">
          {creations.map((c) => (
            <tr key={c.id} className="hover:bg-black/[0.01] transition-colors">
              <td className="px-5 py-4">
                <span className="font-mono text-[10px] text-editorial-muted uppercase tracking-wider block">
                  {c.pieceCode}
                </span>
                <Link href={`/catalog/${c.id}`} className="font-medium hover:text-obsidian text-sm">
                  {c.title}
                </Link>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <div>{c.demographic}</div>
                <div className="text-[11px] text-editorial-muted">{c.garmentType}</div>
              </td>
              <td className="px-5 py-4 whitespace-nowrap italic text-editorial-muted">
                {c.leadArtisan}
              </td>
              <td className="px-5 py-4 whitespace-nowrap font-medium">
                {c.valuationAurum.toLocaleString()} AUR
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <Badge variant={statusVariants[c.availabilityStatus]}>{c.availabilityStatus}</Badge>
              </td>
              <td className="px-5 py-4 text-right whitespace-nowrap">
                <Select
                  value={c.availabilityStatus}
                  onChange={(val) => handleStatusToggle(c.id, val as AvailabilityStatus)}
                  options={STATUS_OPTIONS}
                  disabled={updatingId === c.id}
                  align="right"
                  ariaLabel={`Update status for ${c.pieceCode}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
