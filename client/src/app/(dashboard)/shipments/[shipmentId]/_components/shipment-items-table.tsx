"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { createListShipmentItemsQueryOptions } from "@/hooks/queries/list-shipment-items.query";
import { createListOrderItemsQueryOptions } from "@/hooks/queries/list-order-items.query";
import { createListProductsQueryOptions } from "@/hooks/queries/list-products.query";
import _ from "lodash";

type ShipmentItemsTableProps = {
  shipmentId: string;
};

export function ShipmentItemsTable({ shipmentId }: ShipmentItemsTableProps) {
  const listShipmentItemsQuery = useQuery(
    createListShipmentItemsQueryOptions({ shipmentId }),
  );

  const listOrderItemsQuery = useQuery({
    ...createListOrderItemsQueryOptions({
      ids: listShipmentItemsQuery.data?.items.map((item) => item.orderItemId),
    }),
    enabled:
      listShipmentItemsQuery.isSuccess &&
      listShipmentItemsQuery.data != null &&
      listShipmentItemsQuery.data.items.length > 0,
  });

  const listProductsQuery = useQuery({
    ...createListProductsQueryOptions({
      ids: listOrderItemsQuery.data?.items.map((item) => item.productId),
    }),
    enabled:
      listOrderItemsQuery.isSuccess &&
      listOrderItemsQuery.data != null &&
      listOrderItemsQuery.data.items.length > 0,
  });

  if (
    listShipmentItemsQuery.isLoading ||
    listOrderItemsQuery.isLoading ||
    listProductsQuery.isLoading
  ) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(3)].map((_, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <Skeleton className="h-6 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-12" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-20" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (
    listShipmentItemsQuery.error ||
    listOrderItemsQuery.error ||
    listProductsQuery.error
  ) {
    return <div>Error loading shipment items. Please try again later.</div>;
  }

  const shipmentItems = listShipmentItemsQuery.data?.items || [];
  const orderItems = _.keyBy(listOrderItemsQuery.data?.items, "id");
  const products = _.keyBy(listProductsQuery.data?.items, "id");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold">Product</TableHead>
          <TableHead className="font-bold text-right">Quantity</TableHead>
          <TableHead className="font-bold text-right">Price</TableHead>
          <TableHead className="font-bold text-right">Total Price</TableHead>
          <TableHead className="font-bold text-right">Discount</TableHead>
          <TableHead className="font-bold">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shipmentItems.map((shipmentItem) => {
          const orderItem = orderItems[shipmentItem.orderItemId] || {};
          const product = products[orderItem.productId];
          return (
            <TableRow key={shipmentItem.id}>
              <TableCell className="font-medium">
                {product?.name || "Unknown Product"}
              </TableCell>
              <TableCell className="text-right">{orderItem.quantity}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(orderItem.price)}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(orderItem.totalPrice)}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(orderItem.discount)}
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    orderItem.status === "SHIPPED"
                      ? "bg-green-100 text-green-800"
                      : orderItem.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {orderItem.status}
                </span>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
