import { z } from "zod";

const base = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  city: z.string().min(2),
  message: z.string().min(10),
  turnstileToken: z.string().optional()
});

export const quoteSchema = base.extend({
  serviceSlug: z.string().min(2)
});

export const bookingSchema = base.extend({
  preferredDate: z.string().min(4),
  timeWindow: z.string().min(2)
});
