import { z } from 'zod';

export const TextileFilterSchema = z.object({
  season: z.string().optional(),
  weavePattern: z.string().optional(),
});

export type TextileFilterInput = z.infer<typeof TextileFilterSchema>;

export interface TextileSummary {
  id: string;
  code: string;
  name: string;
  millName: string;
  composition: string;
  weightGsm: number;
  season: string;
  weavePattern: string;
  sourcingRationale: string;
  swatchImageUrl: string;
  creationsCount: number;
}
