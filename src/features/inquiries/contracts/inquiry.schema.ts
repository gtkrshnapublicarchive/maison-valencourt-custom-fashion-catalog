import { z } from 'zod';

export const ViewingInquirySchema = z.object({
  guestName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .regex(/^[a-zA-Z\s\-']+$/, 'Name can only contain letters, spaces, and hyphens'),
  guestEmail: z.string().email('Please enter a valid email address'),
  guestPhone: z.string().max(25).optional().or(z.literal('')),
  preferredDate: z.string().min(1, 'Please select an appointment date'),
  preferredTimeSlot: z.string().min(1, 'Please select a preferred time slot'),
  fittingNotes: z.string().max(400, 'Notes cannot exceed 400 characters').optional().or(z.literal('')),
  creationId: z.string().optional().or(z.literal('')),
  pieceCode: z.string().optional().or(z.literal('')),
});

export type ViewingInquiryInput = z.infer<typeof ViewingInquirySchema>;
