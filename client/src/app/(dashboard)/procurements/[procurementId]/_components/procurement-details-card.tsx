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
import { useDeleteProcurementMutation } from "@/hooks/mutations/delete-procurement.mutation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import _ from "lodash";
import { createListProcurementItemsQueryOptions } from "@/hooks/queries/list-procurment-items.query";
import { createGetProcurementDetailsQueryOptions } from "@/hooks/queries/get-procurement-details.query";

type ProcurementDetailsCardProps = {
  procurementId: string;
};

export function ProcurementDetailsCard({
  procurementId,
}: ProcurementDetailsCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const getProcurementDetailsQuery = useQuery(
    createGetProcurementDetailsQueryOptions({ procurementId }),
  );

  const deleteProcurementMutation = useDeleteProcurementMutation({
    procurementId,
  });

  const listProcurementItemsQuery = useQuery(
    createListProcurementItemsQueryOptions({ procurementId }),
  );

  const onDelete = () =>
    deleteProcurementMutation.mutate(undefined, {
      onSuccess(data) {
        toast({
          title: "Procurement Deleted",
          description: data.message,
        });
        router.push("/procurements");
      },
    });

  if (getProcurementDetailsQuery.isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Procurement Details...</CardTitle>
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

  if (getProcurementDetailsQuery.error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error Fetching Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              There was an issue fetching the procurement details. Please try
              again later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const { data } = getProcurementDetailsQuery;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Procurement Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div>ID:</div>
            <div>{data?.id}</div>
          </div>
          <div>
            <div>Supplier ID:</div>
            <div>{data?.supplierId}</div>
          </div>
          <div>
            <div>Order Date:</div>
            <div>{data?.orderDate}</div>
          </div>
          <div>
            <div>Delivery Date:</div>
            <div>{data?.deliveryDate}</div>
          </div>
          <div>
            <div>Status:</div>
            <Badge
              variant={data?.status === "COMPLETED" ? "success" : "warning"}
            >
              {data?.status}
            </Badge>
          </div>
          <div>
            <div>Total Cost:</div>
            <div>${data?.totalCost}</div>
          </div>
        </div>
        <div className="mt-4">
          <div>Items:</div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Warehouse ID</TableHead>
                <TableHead>Product ID</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listProcurementItemsQuery.data?.items?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.warehouseId}</TableCell>
                  <TableCell>{item.productId}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>${item.quantity * item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="space-x-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/procurements" className="mr-auto">
            <ArrowLeft />
            Back to Procurements
          </Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm">
              Delete Procurement
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                procurement.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button size="sm">
          <Link href={`/procurements/${procurementId}/edit`}>
            Edit Procurement
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
