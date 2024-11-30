"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createOrderBodySchema,
  CreateOrderBodySchema,
} from "@/lib/apis/create-order.api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createListProductsQueryOptions } from "@/hooks/queries/list-products.query";
import { createListWarehousesQueryOptions } from "@/hooks/queries/list-warehouses.query";
import _ from "lodash";
import { useUpdateOrderMutation } from "@/hooks/mutations/update-order.mutation";
import { SelectInventoryProductButton } from "../_components/select-inventory-product-button";
import { Label } from "@/components/ui/label";
import { createGetOrderDetailsQueryOptions } from "@/hooks/queries/get-order-details.query";
import { createGetOrderItemsQueryOptions } from "@/hooks/queries/get-order-items.query";
import {
  updateOrderBodySchema,
  UpdateOrderBodySchema,
} from "@/lib/apis/update-order.api";
import { cn } from "@/lib/utils";

function UpdateOrderForm({ orderId }: { orderId: string }) {
  const getOrderDetailsQuery = useSuspenseQuery(
    createGetOrderDetailsQueryOptions({
      orderId,
    }),
  );
  const getOrderItemsQuery = useSuspenseQuery(
    createGetOrderItemsQueryOptions({
      orderId,
    }),
  );

  const updateOrderForm = useForm<
    UpdateOrderBodySchema & {
      items: Array<
        UpdateOrderBodySchema["items"][number] & {
          maxQuantity: number;
        }
      >;
    }
  >({
    resolver: zodResolver(updateOrderBodySchema),
    defaultValues: {
      status: getOrderDetailsQuery.data?.status,
      paymentStatus: getOrderDetailsQuery.data?.paymentStatus,
      shippingAddress: getOrderDetailsQuery.data?.shippingAddress,
      items: getOrderItemsQuery.data?.items.map((item) => ({
        ...item,
        type: "UPDATE",
      })),
    },
  });

  const updateOrderMutation = useUpdateOrderMutation({
    orderId,
  });

  const orderItemsFieldArray = useFieldArray({
    control: updateOrderForm.control,
    name: "items",
    keyName: "_id",
  });

  const listProductsQuery = useQuery(
    createListProductsQueryOptions({
      ids: _.uniq(_.map(updateOrderForm.getValues().items, "productId")),
      pageSize: _.size(updateOrderForm.getValues().items) + 1,
    }),
  );

  const listWarehouseQuery = useQuery(
    createListWarehousesQueryOptions({
      ids: _.uniq(_.map(updateOrderForm.getValues().items, "warehouseId")),
      pageSize: _.size(updateOrderForm.getValues().items) + 1,
    }),
  );

  const onSubmit = updateOrderForm.handleSubmit(async (values) =>
    updateOrderMutation.mutate(values, {
      onSuccess(_data) {
        updateOrderForm.reset();
        orderItemsFieldArray.remove();
      },
    }),
  );

  return (
    <Form {...updateOrderForm}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={updateOrderForm.control}
          name="shippingAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shipping Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter the shipping address" {...field} />
              </FormControl>
              <FormDescription>
                Enter the shipping address of the order.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={updateOrderForm.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select order status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="PROCESSING">Processing</SelectItem>
                  <SelectItem value="SHIPPED">Shipped</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select the status of the order.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={updateOrderForm.control}
          name="paymentStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="PAID">Paid</SelectItem>
                  <SelectItem value="FAILED">FAILED</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the payment status of the order.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Warehouse</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Subtotal</TableHead>
              <TableHead>
                <SelectInventoryProductButton
                  onSelect={(inventory) => {
                    orderItemsFieldArray.append({
                      maxQuantity: inventory.maxQuantity,
                      warehouseId: inventory.warehouseId,
                      productId: inventory.productId,
                      price: inventory.price,
                      quantity: inventory.quantity,
                      discount: 0,
                      type: "CREATE",
                    });
                  }}
                />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderItemsFieldArray.fields.map((itemField, index) => (
              <TableRow
                key={itemField._id}
                className={cn({
                  "line-through": itemField.type === "DELETE",
                })}
              >
                <TableCell>
                  {_.find(listWarehouseQuery.data?.items, {
                    id: itemField.warehouseId,
                  })?.name ?? itemField.warehouseId}
                </TableCell>
                <TableCell>
                  {_.find(listProductsQuery.data?.items, {
                    id: itemField.productId,
                  })?.name ?? itemField.productId}
                </TableCell>
                <TableCell>
                  <FormField
                    control={updateOrderForm.control}
                    name={`items.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            max={itemField.maxQuantity}
                            readOnly={itemField.type === "DELETE"}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={updateOrderForm.control}
                    name={`items.${index}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            readOnly={itemField.type === "DELETE"}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={updateOrderForm.control}
                    name={`items.${index}.discount`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            readOnly={itemField.type === "DELETE"}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  {updateOrderForm.watch(`items.${index}.quantity`) *
                    updateOrderForm.watch(`items.${index}.price`) -
                    updateOrderForm.watch(`items.${index}.discount`)}
                </TableCell>
                <TableCell>
                  <Button
                    variant={
                      itemField.type === "CREATE" ? "destructive" : "default"
                    }
                    onClick={() => {
                      switch (itemField.type) {
                        case "CREATE":
                          orderItemsFieldArray.remove(index);
                          break;
                        case "UPDATE":
                          orderItemsFieldArray.update(index, {
                            ...itemField,
                            type: "DELETE",
                          });
                          break;
                        case "DELETE":
                          orderItemsFieldArray.update(index, {
                            ...itemField,
                            type: "UPDATE",
                          });
                          break;
                        default:
                          break;
                      }
                    }}
                  >
                    {(() => {
                      switch (itemField.type) {
                        case "CREATE":
                          return "Remove";
                        case "DELETE":
                          return "Undo";
                        case "UPDATE":
                          return "Delete";
                        default:
                          return "";
                      }
                    })()}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Label>Order Total</Label>
        <Input
          value={updateOrderForm.watch("items").reduce((acc, item) => {
            if (item.type === "DELETE") {
              return acc;
            }
            return acc + item.quantity * item.price - item.discount;
          }, 0)}
          disabled
        />

        <Button
          className="w-full mt-4"
          type="submit"
          disabled={updateOrderForm.formState.isSubmitting}
        >
          Update Order
        </Button>
      </form>
    </Form>
  );
}

export { UpdateOrderForm };
