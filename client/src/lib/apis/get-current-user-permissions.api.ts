import { z } from "zod";
import { apiClient } from "../api/client";
import { unauthorizedErrorResponseSchema } from "../api/schemas/unauthorized-error-response-schema";
import { permissionNameSchema } from "../schemas/permission.schema";

export const getCurrentUserPermissionsResponseSchema = z.object({
  items: z.array(permissionNameSchema),
});
export type GetCurrentUserPermissionsResponseSchema = z.infer<
  typeof getCurrentUserPermissionsResponseSchema
>;
export const getCurrentUserPermissionsErrorResponseSchema =
  z.discriminatedUnion("type", [unauthorizedErrorResponseSchema]);
export type GetCurrentUserPermissionsErrorResponseSchema = z.infer<
  typeof getCurrentUserPermissionsErrorResponseSchema
>;

export async function getCurrentUserPermissionsApi(): Promise<GetCurrentUserPermissionsResponseSchema> {
  const response = await apiClient.get<GetCurrentUserPermissionsResponseSchema>(
    "/auth/current-user/permissions",
  );
  return response.data;
}
