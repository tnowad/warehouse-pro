import { getWarehouseDetails } from "@/lib/api/endpoints/get-warehouse-details";
import { getWarehouseList } from "@/lib/api/endpoints/get-warehouse-list";
import { postWarehouseCreate } from "@/lib/api/endpoints/post-warehouse-create";
import { postWarehouseDetailsUpdate } from "@/lib/api/endpoints/post-warehouse-details-update";
import {
  GetWarehouseDetailsErrorResponseSchema,
  GetWarehouseDetailsResponseSchema,
} from "@/lib/api/schemas/get-warehouse-details-schema";
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
import {
  PostWarehouseDetailsUpdateErrorResponseSchema,
  PostWarehouseDetailsUpdateRequestSchema,
  PostWarehouseDetailsUpdateResponseSchema,
} from "@/lib/api/schemas/post-warehouse-details-update-schema";
import { getEndpointQueryKey } from "@/lib/utils";
import {
  keepPreviousData,
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

export function createGetWarehouseListOptions(
  params: GetWarehouseListQueryParams,
) {
  return queryOptions<
    GetWarehouseListResponse,
    GetWarehouseListErrorResponseSchema
  >({
    queryKey: getEndpointQueryKey(params, "getWarehouseList"),
    queryFn: () => getWarehouseList(params),
    placeholderData: keepPreviousData,
  });
}

export function useGetWarehouseListQuery({
  params,
}: {
  params: GetWarehouseListQueryParams;
}): UseQueryResult<
  GetWarehouseListResponse,
  GetWarehouseListErrorResponseSchema
> {
  return useQuery(createGetWarehouseListOptions(params));
}

export function createGetWarehouseDetailsOptions(id: string) {
  return queryOptions<
    GetWarehouseDetailsResponseSchema,
    GetWarehouseDetailsErrorResponseSchema
  >({
    queryKey: ["getWarehouseDetails", id],
    queryFn: () => getWarehouseDetails(id),
  });
}

export function useGetWarehouseDetailsQuery(
  id: string,
): UseQueryResult<
  GetWarehouseDetailsResponseSchema,
  GetWarehouseDetailsErrorResponseSchema
> {
  return useQuery(createGetWarehouseDetailsOptions(id));
}

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

export function useUpdateWarehouseDetailsMutation(warehouseId: string) {
  const queryClient = useQueryClient();

  return useMutation<
    PostWarehouseDetailsUpdateResponseSchema,
    PostWarehouseDetailsUpdateErrorResponseSchema,
    PostWarehouseDetailsUpdateRequestSchema
  >({
    mutationKey: ["updateWarehouseDetails", warehouseId],
    mutationFn: (data) => postWarehouseDetailsUpdate(warehouseId, data),
    onSuccess(data) {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return (
            (query.queryKey[0] === "getWarehouseDetails" &&
              query.queryKey[1] === data.id) ||
            query.queryKey[0] === "getWarehouseList"
          );
        },
      });
    },
  });
}

export function useDeleteWarehouseMutation() {}
