import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateSupplierProductForm } from "./_components/create-supplier-product-form";

export default async function Page({
  params,
}: {
  params: { supplierId: string };
}) {
  const { supplierId } = await params;
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Create Supplier Product</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateSupplierProductForm supplierId={supplierId} />
        </CardContent>
      </Card>
    </>
  );
}
