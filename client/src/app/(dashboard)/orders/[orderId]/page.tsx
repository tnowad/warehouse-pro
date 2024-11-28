import { OrderDetailsCard } from "./_components/order-details-card";

export default async function Page({ params }: PageProps) {
  const { orderId } = await params;

  return (
    <div>
      <OrderDetailsCard orderId={orderId} />
    </div>
  );
}
