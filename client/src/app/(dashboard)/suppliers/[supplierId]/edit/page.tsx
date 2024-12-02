import { UpdateSupplierForm } from "./_components/update-supplier-form";

export default async function Page({ params }: PageProps) {
  const { supplierId } = await params;
  return <UpdateSupplierForm supplierId={supplierId} />;
}
