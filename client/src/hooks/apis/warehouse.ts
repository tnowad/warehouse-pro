import { getWarehouseList } from "@/lib/api/endpoints/get-warehouse-list";
import { postWarehouseCreate } from "@/lib/api/endpoints/post-warehouse-create";
import {
  GetWarehouseListErrorResponseSchema,
  GetWarehouseListQueryParams,
  GetWarehouseListResponse,
} from "@/lib/api/schemas/get-warehouse-list-schema";
import {
  PostWarehouseCreateErrorResponseSchema,
  PostWarehouseCreateRequestSchema,
  PostWarehouseCreateResponseSchema,
} from "@/lib/api/schemas/post-auth-warehouse-create-schema";
import { getEndpointQueryKey } from "@/lib/utils";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

export function useGetWarehouseListQuery({
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
export function useCreateWarehouseMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    PostWarehouseCreateResponseSchema,
    PostWarehouseCreateErrorResponseSchema,
    PostWarehouseCreateRequestSchema
  >({
    mutationKey: ["createWarehouse"],
    mutationFn: (data) => postWarehouseCreate(data),
    onSuccess() {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey[0] === "getWarehouseList";
        },
      });
    },
  });
}
export function useUpdateWarehouseMutation() {}
export function useDeleteWarehouseMutation() {}
