import { CreateSupplierProductForm } from "./_components/create-supplier-product-form";

export default async function Page({
  params,
}: {
  params: { supplierId: string };
}) {
  const { supplierId } = await params;
  return (
    <>
      <CreateSupplierProductForm supplierId={supplierId} />
    </>
  );
}
