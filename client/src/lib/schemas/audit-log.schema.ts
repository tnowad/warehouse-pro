import { z } from "zod";

export const auditLogSchema = z.object({
  id: z.string().uuid(),
  tableName: z.string(),
  recordId: z.string().uuid(),
  action: z.string(),
  changedBy: z.string().uuid(),
  changeDate: z.string().date(),
  details: z.string(),
});
