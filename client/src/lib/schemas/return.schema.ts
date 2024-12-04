import { z } from "zod";
export const returnStatusSchema = z.enum(["PENDING", "APPROVED", "REJECTED"]);

export const returnSchema = z.object({
  id: z.string().uuid(),
  orderItemId: z.string().uuid(),
  returnDate: z.string().date(),
  reason: z.string(),
  status: returnStatusSchema,
});
export type ReturnTableSchema = z.infer<typeof returnSchema>;
