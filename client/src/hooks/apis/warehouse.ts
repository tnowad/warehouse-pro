import { getWarehouseList } from "@/lib/api/endpoints/get-warehouse-list";
import {
  GetWarehouseListErrorResponseSchema,
  GetWarehouseListQueryParams,
  GetWarehouseListResponse,
} from "@/lib/api/schemas/get-warehouse-list-schema";
import { useQuery } from "@tanstack/react-query";

export const getEndpointQueryKey = <T, R extends string>(
  params: T,
  endpoint: R,
) => [endpoint, ...(params ? [params] : [])] as const;

export function useGetWarehouseListQuery({
  params,
}: {
  params: GetWarehouseListQueryParams;
}) {
  const queryKey = getEndpointQueryKey(params, "getWarehouseList");
  return useQuery<
    GetWarehouseListQueryParams,
    GetWarehouseListErrorResponseSchema,
    GetWarehouseListResponse
  >({
    queryKey,
    queryFn: () => getWarehouseList(params),
  });
}
export function useGetWarehouseDetailsQuery() {}
export function useCreateWarehouseMutation() {}
export function useUpdateWarehouseMutation() {}
export function useDeleteWarehouseMutation() {}
