import { CreateProcurementForm } from "./_components/create-procurement-form";

export default async function Page({
  params,
}: {
  params: { supplierId: string };
}) {
  const { supplierId } = params;
  return <CreateProcurementForm supplierId={supplierId} />;
}
