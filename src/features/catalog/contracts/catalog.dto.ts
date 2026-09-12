import { z } from 'zod';

export const CatalogFilterSchema = z.object({
  demographic: z.string().optional(),
  garmentType: z.string().optional(),
  collectionTheme: z.string().optional(),
  search: z.string().optional(),
});

export type CatalogFilterInput = z.infer<typeof CatalogFilterSchema>;
