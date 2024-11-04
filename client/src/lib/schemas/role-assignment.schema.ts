import { z } from "zod";

export const roleAssignmentSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  roleId: z.string().uuid(),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
});
