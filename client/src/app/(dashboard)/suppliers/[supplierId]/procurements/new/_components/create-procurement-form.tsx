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
import { Label } from "@/components/ui/label";
import {
  procurementSchema,
  ProcurementSchema,
} from "@/lib/schemas/procurement.schema";
import {
  CreateProcurementBodySchema,
  createProcurementBodySchema,
} from "@/lib/apis/create-procurement.api";
import { useCreateProcurementMutation } from "@/hooks/mutations/create-procurement.mutation";
import { SelectInventoryProductButton } from "@/app/(dashboard)/orders/_components/select-inventory-product-button";

type CreateProcurementFormProps = {
  supplierId: string;
};

function CreateProcurementForm({ supplierId }: CreateProcurementFormProps) {
  const createProcurementForm = useForm<CreateProcurementBodySchema>({
    resolver: zodResolver(createProcurementBodySchema),
    values: {
      supplierId,
      orderDate: "",
      deliveryDate: "",
      status: "PENDING",
      items: [],
    },
  });

  const createProcurementMutation = useCreateProcurementMutation();

  const procurementItemsFieldArray = useFieldArray({
    control: createProcurementForm.control,
    name: "items",
  });

  console.log(createProcurementForm.formState.errors);

  const listProductsQuery = useQuery(
    createListProductsQueryOptions({
      ids: _.uniq(_.map(createProcurementForm.getValues().items, "productId")),
      pageSize: _.size(createProcurementForm.getValues().items) + 1,
    }),
  );

  const listWarehouseQuery = useQuery(
    createListWarehousesQueryOptions({
      ids: _.uniq(
        _.map(createProcurementForm.getValues().items, "warehouseId"),
      ),
      pageSize: _.size(createProcurementForm.getValues().items) + 1,
    }),
  );

  const onSubmit = createProcurementForm.handleSubmit(async (values) =>
    createProcurementMutation.mutate(values, {
      onSuccess(_data) {
        createProcurementForm.reset();
        procurementItemsFieldArray.remove();
      },
    }),
  );

  return (
    <Form {...createProcurementForm}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={createProcurementForm.control}
          name="orderDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>Enter the order date.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createProcurementForm.control}
          name="deliveryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>Enter the delivery date.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createProcurementForm.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select procurement status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="PROCESSING">Processing</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the status of the procurement.
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
              <TableHead>Total Cost</TableHead>
              <TableHead>
                <SelectInventoryProductButton
                  onSelect={(inventory) => {
                    procurementItemsFieldArray.append({
                      warehouseId: inventory.warehouseId,
                      productId: inventory.productId,
                      price: inventory.price,
                      quantity: 0,
                    });
                  }}
                />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {procurementItemsFieldArray.fields.map((itemField, index) => (
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
                    control={createProcurementForm.control}
                    name={`items.${index}.quantity`}
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
                    control={createProcurementForm.control}
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
                  {createProcurementForm.watch(`items.${index}.quantity`) *
                    createProcurementForm.watch(`items.${index}.price`)}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => procurementItemsFieldArray.remove(index)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Label>Total Procurement Cost</Label>
        <Input
          value={createProcurementForm
            .watch("items")
            .reduce((acc, item) => acc + item.quantity * item.price, 0)}
          disabled
        />

        <Button
          className="w-full mt-4"
          type="submit"
          disabled={createProcurementForm.formState.isSubmitting}
        >
          Create Procurement
        </Button>
      </form>
    </Form>
  );
}

export { CreateProcurementForm };
