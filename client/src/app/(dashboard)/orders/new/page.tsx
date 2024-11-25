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
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn, mapFieldErrorToFormError } from "@/lib/utils";
import {
  useInfiniteQuery,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "@/components/ui/multiple-selector";
import { Badge } from "@/components/ui/badge";
import { createGetUserDetailsQueryOptions } from "@/hooks/queries/get-user-details.query";
import { createListRolesInfiniteQueryOptions } from "@/hooks/queries/list-roles.query";
import { useUpdateUserMutation } from "@/hooks/mutations/update-user.mutation";
import {
  updateUserBodySchema,
  UpdateUserBodySchema,
} from "@/lib/apis/update-user.api";
import { RoleSchema } from "@/lib/schemas/role.schema";
import { Skeleton } from "@/components/ui/skeleton";
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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type SelectProductButtonProps = {
  onSelect: () => void;
};
export function SelectProductButton() {}

export default function Page() {
  const createOrderForm = useForm<CreateOrderBodySchema>({
    resolver: zodResolver(createOrderBodySchema),
    values: {
      shippingAddress: "",
      paymentStatus: "PENDING",
      status: "PENDING",
      items: [],
    },
  });

  const orderItemsFieldArray = useFieldArray({
    control: createOrderForm.control,
    name: "items",
  });

  const onSubmit = createOrderForm.handleSubmit(async (values) => {});

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
              <TableHead>
                <Button>Add Item</Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderItemsFieldArray.fields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell>
                  <FormField
                    control={createOrderForm.control}
                    name={`items.${index}.warehouseId`}
                    render={({ field }) => (
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select warehouse" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Warehouse 1</SelectItem>
                            <SelectItem value="2">Warehouse 2</SelectItem>
                            <SelectItem value="3">Warehouse 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={createOrderForm.control}
                    name={`items.${index}.productId`}
                    render={({ field }) => (
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select product" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Product 1</SelectItem>
                            <SelectItem value="2">Product 2</SelectItem>
                            <SelectItem value="3">Product 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={createOrderForm.control}
                    name={`items.${index}.quantity`}
                    render={({ field }) => (
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={createOrderForm.control}
                    name={`items.${index}.price`}
                    render={({ field }) => (
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={createOrderForm.control}
                    name={`items.${index}.discount`}
                    render={({ field }) => (
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={createOrderForm.control}
                    name={`items.${index}.subtotal`}
                    render={({ field }) => (
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                    )}
                  />
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

        <Button
          className="w-full mt-4"
          type="submit"
          disabled={
            createOrderForm.formState.isSubmitting ||
            !createOrderForm.formState.isValid
          }
        >
          Create Order
        </Button>
      </form>
    </Form>
  );
}
