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

import { useQuery } from "@tanstack/react-query";
import { createListProductsQueryOptions } from "@/hooks/queries/list-products.query";
import { createListWarehousesQueryOptions } from "@/hooks/queries/list-warehouses.query";
import _ from "lodash";
import { useCreateOrderMutation } from "@/hooks/mutations/create-order.mutation";
import { SelectInventoryProductButton } from "../_components/select-inventory-product-button";
import { Label } from "@/components/ui/label";

function CreateOrderForm() {
  const createOrderForm = useForm<
    CreateOrderBodySchema & {
      items: Array<
        CreateOrderBodySchema["items"][number] & {
          maxQuantity: number;
        }
      >;
    }
  >({
    resolver: zodResolver(createOrderBodySchema),
    values: {
      shippingAddress: "",
      paymentStatus: "PENDING",
      status: "PENDING",
      items: [],
    },
  });

  const createOrderMutation = useCreateOrderMutation();

  const orderItemsFieldArray = useFieldArray({
    control: createOrderForm.control,
    name: "items",
  });

  const listProductsQuery = useQuery(
    createListProductsQueryOptions({
      ids: _.uniq(_.map(createOrderForm.getValues().items, "productId")),
      pageSize: _.size(createOrderForm.getValues().items) + 1,
    }),
  );

  const listWarehouseQuery = useQuery(
    createListWarehousesQueryOptions({
      ids: _.uniq(_.map(createOrderForm.getValues().items, "warehouseId")),
      pageSize: _.size(createOrderForm.getValues().items) + 1,
    }),
  );

  const onSubmit = createOrderForm.handleSubmit(async (values) =>
    createOrderMutation.mutate(values, {
      onSuccess(_data) {
        createOrderForm.reset();
        orderItemsFieldArray.remove();
      },
    }),
  );

  return (
    <Form {...createOrderForm}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={createOrderForm.control}
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
          control={createOrderForm.control}
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
          control={createOrderForm.control}
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
              <TableHead className="flex justify-center">
                <SelectInventoryProductButton
                  onSelect={(inventory) => {
                    orderItemsFieldArray.append({
                      maxQuantity: inventory.maxQuantity,
                      warehouseId: inventory.warehouseId,
                      productId: inventory.productId,
                      price: inventory.price,
                      quantity: inventory.quantity,
                      discount: 0,
                    });
                  }}
                />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderItemsFieldArray.fields.map((itemField, index) => (
              <TableRow key={itemField.id}>
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
                    control={createOrderForm.control}
                    name={`items.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            max={itemField.maxQuantity}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={createOrderForm.control}
                    name={`items.${index}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={createOrderForm.control}
                    name={`items.${index}.discount`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  {createOrderForm.watch(`items.${index}.quantity`) *
                    createOrderForm.watch(`items.${index}.price`) -
                    createOrderForm.watch(`items.${index}.discount`)}
                </TableCell>
                <TableCell>
                  <Button onClick={() => orderItemsFieldArray.remove(index)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Label>Order Total</Label>
        <Input
          value={createOrderForm
            .watch("items")
            .reduce(
              (acc, item) => acc + item.quantity * item.price - item.discount,
              0,
            )}
          disabled
        />

        <Button
          className="w-full mt-4"
          type="submit"
          disabled={createOrderForm.formState.isSubmitting}
        >
          Create Order
        </Button>
      </form>
    </Form>
  );
}

export { CreateOrderForm };
