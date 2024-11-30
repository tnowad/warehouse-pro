import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UpdateOrderForm } from "../../_components/update-order-form";
import Link from "next/link";

export default async function Page({ params }: PageProps) {
  const { orderId } = await params;

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle>Update Order</CardTitle>
        <CardDescription>
          Fill out the form below to update the order.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UpdateOrderForm orderId={orderId} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/orders" className="text-sm hover:text-primary">
          Back to Orders
        </Link>
      </CardFooter>
    </Card>
  );
}
