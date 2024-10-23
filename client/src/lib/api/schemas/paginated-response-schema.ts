import { z } from "zod";

export const paginationResponseSchema = z.object({
  offset: z.number(),
  limit: z.number(),
  previousOffset: z.number().nullable(),
  nextOffset: z.number().nullable(),
  currentPage: z.number(),
  pageCount: z.number(),
  totalCount: z.number(),
});

export const sortFieldSchema = z.object({
  field: z.string(),
  order: z.enum(["asc", "desc"]),
});

export const metadataResponseSchema = z.object({
  pagination: paginationResponseSchema,
  sortedBy: z.array(sortFieldSchema),
});

export const paginatedResponseSchema = z.object({
  items: z.array(z.unknown({})),
  metadata: z.lazy(() => metadataResponseSchema),
});
