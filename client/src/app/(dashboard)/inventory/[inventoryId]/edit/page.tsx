import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UpdateInventoryForm } from "./_components/update-inventory-form";

type Params = Promise<{
  inventoryId: string;
}>;

export default async function Page({ params }: { params: Params }) {
  const { inventoryId } = await params;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Inventory
        </CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateInventoryForm inventoryId={inventoryId} />
      </CardContent>
    </Card>
  );
}
