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
import { useDeleteOrderMutation } from "@/hooks/mutations/delete-order.mutation";
import { createGetOrderDetailsQueryOptions } from "@/hooks/queries/get-order-details.query";
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
import { createGetOrderItemsQueryOptions } from "@/hooks/queries/get-order-items.query";
import _ from "lodash";
import { createListProductsQueryOptions } from "@/hooks/queries/list-products.query";
import { createListWarehousesQueryOptions } from "@/hooks/queries/list-warehouses.query";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
type OrderDetailsCardProps = {
  orderId: string;
};

export function OrderDetailsCard({ orderId }: OrderDetailsCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const getOrderDetailsQuery = useQuery(
    createGetOrderDetailsQueryOptions({ orderId }),
  );
  const getOrderItemsQuery = useQuery(
    createGetOrderItemsQueryOptions({
      orderId,
    }),
  );
  const listProductsQuery = useQuery(
    createListProductsQueryOptions({
      ids: _.uniq(_.map(getOrderItemsQuery.data?.items, "productId")),
      pageSize: getOrderItemsQuery.data?.rowCount,
    }),
  );

  const listWarehouseQuery = useQuery(
    createListWarehousesQueryOptions({
      ids: _.uniq(_.map(getOrderItemsQuery.data?.items, "warehouseId")),
      pageSize: getOrderItemsQuery.data?.rowCount,
    }),
  );

  const deleteOrderMutation = useDeleteOrderMutation({ orderId });

  const onDelete = () =>
    deleteOrderMutation.mutate(undefined, {
      onSuccess(data) {
        toast({
          title: "Order Deleted",
          description: data.message,
        });
        router.push("/orders");
      },
    });

  if (getOrderDetailsQuery.isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Order Details...</CardTitle>
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

  if (getOrderDetailsQuery.error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error Fetching Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              There was an issue fetching the order details. Please try again
              later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const { data } = getOrderDetailsQuery;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 xl:grid grid-cols-2">
          <div>
            <div>Order ID:</div>
            <div>{data?.id}</div>
          </div>

          <div>
            <div>Status:</div>
            <div>{data?.status}</div>
          </div>

          <div>
            <div>Payment Status:</div>
            <div>{data?.paymentStatus}</div>
          </div>

          <div>
            <div>Total Amount:</div>
            <div>{data?.totalAmount}</div>
          </div>

          <div className="col-span-2">
            <div>Shipping Address:</div>
            <div>{data?.shippingAddress}</div>
          </div>

          <div className="col-span-2">
            <div>Items:</div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Warehouse</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getOrderItemsQuery.data?.items?.map((item) => {
                  const productName =
                    listProductsQuery.data?.items.find(
                      (product) => product.id === item.productId,
                    )?.name || item.productId;

                  const warehouseName =
                    listWarehouseQuery.data?.items.find(
                      (warehouse) => warehouse.id === item.warehouseId,
                    )?.name || item.warehouseId;

                  return (
                    <TableRow key={item.id}>
                      <TableCell>{productName}</TableCell>
                      <TableCell>{warehouseName}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.discount}</TableCell>
                      <TableCell>${item.price}</TableCell>
                      <TableCell>${item.totalPrice}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
      <CardFooter className="space-x-2">
        <Button variant={"ghost"} size="sm" asChild>
          <Link href="/orders" className="mr-auto">
            <ArrowLeft />
            Back to Orders
          </Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm">
              Delete Order
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                order.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button size="sm">
          <Link href={`/orders/${orderId}/edit`}>Edit Order</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
