import { getWarehouseList } from "@/lib/api/endpoints/get-warehouse-list";
import {
  GetWarehouseListErrorResponseSchema,
  GetWarehouseListQueryParams,
  GetWarehouseListResponse,
} from "@/lib/api/schemas/get-warehouse-list-schema";
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

export const getEndpointQueryKey = <T, R extends string>(
  params: T,
  endpoint: R,
) => [endpoint, ...(params ? [params] : [])] as const;

export function useGetWarehouseListQuery<T>({
  params,
}: {
  params: GetWarehouseListQueryParams;
}): UseQueryResult<
  GetWarehouseListResponse,
  GetWarehouseListErrorResponseSchema
> {
  const queryKey = getEndpointQueryKey(params, "getWarehouseList");
  return useQuery({
    queryKey,
    queryFn: () => getWarehouseList(params),
    placeholderData: keepPreviousData,
  });
}
export function useGetWarehouseDetailsQuery() {}
export function useCreateWarehouseMutation() {}
export function useUpdateWarehouseMutation() {}
export function useDeleteWarehouseMutation() {}
