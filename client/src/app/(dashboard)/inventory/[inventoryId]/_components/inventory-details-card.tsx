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
import { useDeleteInventoryMutation } from "@/hooks/mutations/delete-inventory.mutation";
import { createGetInventoryDetailsQueryOptions } from "@/hooks/queries/get-inventory-details.query";
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

type InventoryDetailsCardProps = {
  inventoryId: string;
};

export function InventoryDetailsCard({
  inventoryId,
}: InventoryDetailsCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const getInventoryDetailsQuery = useQuery(
    createGetInventoryDetailsQueryOptions({ inventoryId }),
  );

  const deleteInventoryMutation = useDeleteInventoryMutation({ inventoryId });

  const onDelete = () =>
    deleteInventoryMutation.mutate(undefined, {
      onSuccess(data) {
        toast({
          title: "Inventory Deleted",
          description: data.message,
        });
        router.push("/inventory");
      },
    });

  if (getInventoryDetailsQuery.isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Inventory Details...</CardTitle>
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

  if (getInventoryDetailsQuery.error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error Fetching Inventory Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              There was an issue fetching the inventory details. Please try
              again later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const { data } = getInventoryDetailsQuery;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 xl:grid grid-cols-2">
          <div>
            <div>Inventory ID:</div>
            <div>{data?.id}</div>
          </div>

          <div>
            <div>Warehouse ID:</div>
            <div>{data?.warehouseId}</div>
          </div>

          <div>
            <div>Product ID:</div>
            <div>{data?.productId}</div>
          </div>

          <div>
            <div>Quantity:</div>
            <div>{data?.quantity}</div>
          </div>

          <div>
            <div>Price:</div>
            <div>{data?.price}</div>
          </div>

          <div>
            <div>Minimum Stock Level:</div>
            <div>{data?.minimumStockLevel}</div>
          </div>

          <div>
            <div>Status:</div>
            <Badge
              variant={data?.status === "ACTIVE" ? "success" : "destructive"}
            >
              {data?.status}
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="space-x-2">
        <Button variant={"ghost"} size="sm" asChild>
          <Link href="/inventory" className="mr-auto">
            <ArrowLeft />
            Back to Inventory
          </Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm">
              Delete Inventory
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                inventory item.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button size="sm">
          <Link href={`/inventory/${inventoryId}/edit`}>Edit Inventory</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
