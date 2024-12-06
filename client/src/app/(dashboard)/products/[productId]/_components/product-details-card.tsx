"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteProductMutation } from "@/hooks/mutations/delete-product.mutation";
import { createGetProductDetailsQueryOptions } from "@/hooks/queries/get-product-details.query";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

type ProductDetailsCardProps = {
  productId: string;
};

export function ProductDetailsCard({ productId }: ProductDetailsCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const getProductDetailsQuery = useQuery(
    createGetProductDetailsQueryOptions({ productId }),
  );

  const deleteProductMutation = useDeleteProductMutation({ productId });

  const onDelete = () =>
    deleteProductMutation.mutate(undefined, {
      onSuccess(data) {
        toast({
          title: "Product Deleted",
          description: data.message,
        });
        router.push("/products");
      },
    });

  if (getProductDetailsQuery.isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Product Details...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (getProductDetailsQuery.error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error Fetching Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              There was an issue fetching the product details. Please try again
              later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }
  const { data } = getProductDetailsQuery;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div>ID:</div>
            <div>{data?.id}</div>
          </div>

          <div>
            <div>Name:</div>
            <div>{data?.name}</div>
          </div>

          <div>
            <div>Description:</div>
            <div>{data?.description}</div>
          </div>

          <div>
            <div>SKU:</div>
            <div>{data?.sku}</div>
          </div>

          <div>
            <div>Created At:</div>
            <div>{data?.createdAt}</div>
          </div>

          <div>
            <div>Updated At:</div>
            <div>{data?.updatedAt}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="space-x-2">
        <Button variant={"ghost"} size="sm" asChild>
          <Link href="/products" className="mr-auto">
            <ArrowLeft />
            Back to Products
          </Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm">
              Delete Product
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                product.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button size="sm">
          <Link href={`/products/${productId}/edit`}>Edit Product</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
