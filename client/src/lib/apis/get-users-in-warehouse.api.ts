import { z } from "zod";
import { userSchema } from "../schemas/user.schema";
import { apiClient } from "../api/client";

export const getUsersInWarehouseParamsSchema = z.object({
  id: z.string().uuid(),
});
export type GetUsersInWarehouseParamsSchema = z.infer<
  typeof getUsersInWarehouseParamsSchema
>;

export const getUsersInWarehouseResponseSchema = z.object({
  items: z.array(
    userSchema.pick({
      id: true,
      name: true,
      email: true,
    }),
  ),
});
export type GetUsersInWarehouseResponseSchema = z.infer<
  typeof getUsersInWarehouseResponseSchema
>;

export async function getUsersInWarehouse(
  params: GetUsersInWarehouseParamsSchema,
): Promise<GetUsersInWarehouseResponseSchema> {
  const response = await apiClient.get<GetUsersInWarehouseResponseSchema>(
    `/warehouses/${params.id}/users`,
  );
  return response.data;
}
