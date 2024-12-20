import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateOrderForm } from "../_components/create-order-form";
import Link from "next/link";

export default function Page() {
  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle>Create Order</CardTitle>
        <CardDescription>
          Fill out the form below to create a new order.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CreateOrderForm />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/orders" className="text-sm hover:text-primary">
          Back to Orders
        </Link>
      </CardFooter>
    </Card>
  );
}
