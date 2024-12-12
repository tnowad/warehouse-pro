import { ShipmentDetailsCard } from "./_components/shipment-details-card";

type Params = {
  shipmentId: string;
};

export default async function Page({ params }: { params: Params }) {
  const { shipmentId } = await params;
  return <ShipmentDetailsCard shipmentId={shipmentId} />;
}
