import { z } from 'zod';

export const TestimonialSubmissionSchema = z.object({
  authorName: z
    .string()
    .min(2, 'Author name must be at least 2 characters')
    .max(50, 'Author name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s\-']+$/, 'Name can only contain letters, spaces, and hyphens'),
  cityOrRegion: z
    .string()
    .min(2, 'City or Region must be at least 2 characters')
    .max(50, 'City or Region must not exceed 50 characters')
    .regex(/^[a-zA-Z\s\-',]+$/, 'City can only contain letters, spaces, hyphens, and commas'),
  creationReferenced: z.string().max(100).optional().or(z.literal('')),
  rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
  content: z
    .string()
    .min(30, 'Narrative must be at least 30 characters detailing your bespoke experience')
    .max(600, 'Narrative cannot exceed 600 characters')
    .refine((val) => !/<[^>]*>?/gm.test(val), {
      message: 'HTML or markup tags are strictly prohibited',
    }),
});

export type TestimonialSubmissionInput = z.infer<typeof TestimonialSubmissionSchema>;

export const DeletionRequestSchema = z.object({
  testimonialId: z.string().min(1, 'Testimonial ID is required'),
  reason: z.string().min(10, 'Please provide a reason of at least 10 characters').max(300),
});

export type DeletionRequestInput = z.infer<typeof DeletionRequestSchema>;
