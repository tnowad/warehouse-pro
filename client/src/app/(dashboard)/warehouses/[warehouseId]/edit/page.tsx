import { WarehouseDetailsUpdate } from "./_components/warehouse-details-update";

type WarehouseDetailsEditPageProps = {
  params: Promise<{ warehouseId: string }>;
};
export default async function WarehouseDetailsEditPage({
  params,
}: WarehouseDetailsEditPageProps) {
  const { warehouseId } = await params;

  return (
    <>
      <WarehouseDetailsUpdate warehouseId={warehouseId} />
    </>
  );
}
