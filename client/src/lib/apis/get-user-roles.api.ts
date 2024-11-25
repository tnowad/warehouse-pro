import { z } from "zod";
import { roleSchema } from "../schemas/role.schema";
import { apiClient } from "../api/client";
import { queryOptions } from "@tanstack/react-query";

export const getUserRolesParamsSchema = z.object({
  userId: z.string(),
});

export type GetUserRolesParamsSchema = z.infer<typeof getUserRolesParamsSchema>;

export const getUserRolesResponseSchema = z.object({
  items: z.array(
    roleSchema.pick({
      id: true,
      name: true,
    }),
  ),
});

export type GetUserRolesResponseSchema = z.infer<
  typeof getUserRolesResponseSchema
>;

export const getUserRolesErrorResponseSchema = z.object({
  message: z.string(),
});

export type GetUserRolesErrorResponseSchema = z.infer<
  typeof getUserRolesErrorResponseSchema
>;

export async function getUserRolesApi(params: GetUserRolesParamsSchema) {
  const response = await apiClient.get<GetUserRolesResponseSchema>(
    `/users/${params.userId}/roles`,
  );
  return response.data;
}
