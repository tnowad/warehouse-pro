import { InventoryDetailsCard } from "./_components/inventory-details-card";

type Params = Promise<{ inventoryId: string }>;
export default async function Page({ params }: { params: Params }) {
  const { inventoryId } = await params;
  return (
    <>
      <InventoryDetailsCard inventoryId={inventoryId} />
    </>
  );
}
