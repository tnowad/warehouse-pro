import { SupplierDetailsCard } from "./_components/supplier-details-card";

export default async function Page({
  params,
}: {
  params: {
    supplierId: string;
  };
}) {
  const { supplierId } = await params;
  return <SupplierDetailsCard supplierId={supplierId} />;
}
