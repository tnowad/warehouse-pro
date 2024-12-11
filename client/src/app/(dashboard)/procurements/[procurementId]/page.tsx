import { ProcurementDetailsCard } from "./_components/procurement-details-card";

type Params = Promise<{
  procurementId: string;
}>;
export default async function Page({ params }: { params: Params }) {
  const { procurementId } = await params;
  return <ProcurementDetailsCard procurementId={procurementId} />;
}
