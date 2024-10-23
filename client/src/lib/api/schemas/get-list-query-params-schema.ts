import { z } from "zod";

export const getListQueryParamsSchema = z.object({
  query: z.string().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export type GetListQueryParams = z.infer<typeof getListQueryParamsSchema>;
