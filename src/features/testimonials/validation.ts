import { z } from 'zod'
import { id } from 'zod/v4/locales';

export const testimonialSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  content: z.string().min(1, "Content is required"),
  snapchat: z.string().optional(),
  instagram: z.string().optional(),
  assetId: z.number().optional(),
});

export type Testimonial = z.infer<typeof testimonialSchema>;
export type NewTestimonial = Omit<Testimonial, 'id'>;