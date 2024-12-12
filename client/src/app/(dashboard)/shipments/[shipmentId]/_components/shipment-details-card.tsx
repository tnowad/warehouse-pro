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
import { useDeleteShipmentMutation } from "@/hooks/mutations/delete-shipment.mutation";
import { createGetShipmentDetailsQueryOptions } from "@/hooks/queries/get-shipment-details.query";
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
import { ShipmentItemsTable } from "./shipment-items-table";

type ShipmentDetailsCardProps = {
  shipmentId: string;
};

export function ShipmentDetailsCard({ shipmentId }: ShipmentDetailsCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const getShipmentDetailsQuery = useQuery(
    createGetShipmentDetailsQueryOptions({ shipmentId }),
  );

  const deleteShipmentMutation = useDeleteShipmentMutation({ shipmentId });

  const onDelete = () =>
    deleteShipmentMutation.mutate(undefined, {
      onSuccess(data) {
        toast({
          title: "Shipment Deleted",
          description: data.message,
        });
        router.push("/shipments");
      },
    });

  if (getShipmentDetailsQuery.isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Shipment Details...</CardTitle>
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

  if (getShipmentDetailsQuery.error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error Fetching Shipment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              There was an issue fetching the shipment details. Please try again
              later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const { data } = getShipmentDetailsQuery;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 xl:grid grid-cols-2">
          <div>
            <div>Shipment ID:</div>
            <div>{data?.id}</div>
          </div>

          <div>
            <div>Order ID:</div>
            <div>{data?.orderId}</div>
          </div>

          <div>
            <div>Status:</div>
            <div>{data?.status}</div>
          </div>

          <div>
            <div>Shipment Date:</div>
            <div>{data?.shipmentDate}</div>
          </div>

          <div>
            <div>Tracking Number:</div>
            <div>{data?.trackingNumber}</div>
          </div>

          <div>
            <div>Shipping Method:</div>
            <div>{data?.shippingMethod}</div>
          </div>

          <div>
            <div>Delivery Estimate:</div>
            <div>{data?.deliveryEstimate}</div>
          </div>

          <div>
            <div>Carrier:</div>
            <div>{data?.carrier}</div>
          </div>

          <div className="col-span-2">
            <div>Items:</div>
            <ShipmentItemsTable shipmentId={shipmentId} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="space-x-2">
        <Button variant={"ghost"} size="sm" asChild>
          <Link href="/shipments" className="mr-auto">
            <ArrowLeft />
            Back to Shipments
          </Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm">
              Delete Shipment
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                shipment.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button size="sm">
          <Link href={`/shipments/${shipmentId}/edit`}>Edit Shipment</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
