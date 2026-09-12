import React from 'react';
import { prisma } from '@/core/database/prisma';
import { CatalogManagementTable } from '@/features/admin/components/catalog_management_table';

export const metadata = {
  title: 'Artisan Garment Catalog Management | Maison Valencourt',
};

export default async function AdminCatalogPage() {
  const creations = await prisma.catalogCreation.findMany({
    orderBy: { pieceCode: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-editorial-muted font-medium block mb-1">
          Artisan Inventory Control
        </span>
        <h1 className="font-editorial text-3xl font-medium text-editorial-text">
          Catalog Creation Management
        </h1>
        <p className="text-xs sm:text-sm text-editorial-muted mt-1 leading-relaxed">
          Monitor artisan tailor concept pieces and toggle salon availability. Pieces marked &ldquo;Reserved for
          Viewing&rdquo; remain visible with an appointment pending tag.
        </p>
      </div>

      <CatalogManagementTable initialCreations={creations} />
    </div>
  );
}
