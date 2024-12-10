import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateInventoryForm } from "./_components/create-inventory-form";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Inventory
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CreateInventoryForm />
      </CardContent>
    </Card>
  );
}
