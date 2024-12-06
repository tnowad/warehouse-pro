import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductDetailsUpdateForm } from "./_components/update-product-details-form";

export default async function Page({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = await params;

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle>Update Product</CardTitle>
        <CardDescription>Edit the product details below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <ProductDetailsUpdateForm productId={productId} />
        </Suspense>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/products" className="text-sm hover:text-primary">
          Back to Products
        </Link>
      </CardFooter>
    </Card>
  );
}
