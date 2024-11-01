import { z } from "zod";

export const returnSchema = z.object({
  id: z.string().uuid(),
  orderItemId: z.string().uuid(),
  returnDate: z.string().date(),
  reason: z.string(),
  status: z.string(),
});
