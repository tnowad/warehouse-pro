import { z } from "zod";
import { userSchema } from "../schemas/user.schema";
import { apiClient } from "../api/client";

export const listUsersQueryFilterSchema = z.object({
  ids: z.array(z.string()).optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  createdAt: z.string().date().optional(),
  updatedAt: z.string().date().optional(),
});

export const listUsersQuerySchema = z
  .object({
    query: z.string().optional(),
    sort: z.string().optional(),
    page: z.number().optional(),
    pageSize: z.number().optional(),
  })
  .merge(listUsersQueryFilterSchema);
export type ListUsersQuerySchema = z.infer<typeof listUsersQuerySchema>;

export const listUsersResponseSchema = z.object({
  items: z.array(userSchema),
  rowCount: z.number(),
});
export type ListUsersResponseSchema = z.infer<typeof listUsersResponseSchema>;

export const listUsersErrorResponseSchema = z.object({
  message: z.string(),
});
export type ListUsersErrorResponseSchema = z.infer<
  typeof listUsersErrorResponseSchema
>;

export async function listUsersApi(
  query: ListUsersQuerySchema,
): Promise<ListUsersResponseSchema> {
  const response = await apiClient.get<ListUsersResponseSchema>(
    `/users`,
    query,
  );
  return response.data;
}
