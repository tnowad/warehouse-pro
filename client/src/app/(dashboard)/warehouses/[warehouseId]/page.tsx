import { WarehouseDetails } from "./_components/warehouse-details";
import { getQueryClient } from "@/app/get-query-client";
import { createGetWarehouseDetailsOptions } from "@/hooks/queries/get-warehouse-details.query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type WarehouseDetailPageProps = {
  params: Promise<{
    warehouseId: string;
  }>;
};
export default async function WarehouseDetailPage({
  params,
}: WarehouseDetailPageProps) {
  const { warehouseId } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    createGetWarehouseDetailsOptions({ id: warehouseId }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WarehouseDetails warehouseId={warehouseId} />
    </HydrationBoundary>
  );
}
