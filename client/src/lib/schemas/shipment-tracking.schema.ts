import { z } from "zod";

export const shipmentTrackingSchema = z.object({
  id: z.string().uuid(),
  shipmentId: z.string().uuid(),
  trackingEvent: z.string(),
  eventDate: z.string().date(),
  location: z.string(),
  status: z.string(),
});
