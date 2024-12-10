"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
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
import {
  inventorySchema,
  InventorySchema,
} from "@/lib/schemas/inventory.schema";
import { SelectProductButton } from "@/app/(dashboard)/suppliers/[supplierId]/_components/select-product-button";
import { useCreateInventoryMutation } from "@/hooks/mutations/create-inventory.mutation";
import { SelectWarehouseButton } from "./_components/select-warehouse-button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { createInventoryBodySchema } from "@/lib/apis/create-inventory.api";

export type CreateInventoryFormProps = {};

export const CreateInventoryForm = ({}: CreateInventoryFormProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const createInventoryMutation = useCreateInventoryMutation();

  const createInventoryForm = useForm<InventorySchema>({
    resolver: zodResolver(createInventoryBodySchema),
    defaultValues: {
      id: "",
      warehouseId: "",
      productId: "",
      quantity: 0,
      price: 0,
      minimumStockLevel: 0,
      status: "ACTIVE",
    },
  });

  const onSubmit = createInventoryForm.handleSubmit((values) => {
    createInventoryMutation.mutate(values, {
      onSuccess: () => {
        toast({
          title: "Inventory Created",
          description: "The new inventory record has been added successfully.",
        });
        router.push("/inventory");
      },
      onError: (error) => {
        toast({
          title: "Inventory Creation Failed",
          description: error.message,
        });
      },
    });
  });

  return (
    <Form {...createInventoryForm}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={createInventoryForm.control}
          name="warehouseId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Warehouse ID</FormLabel>
              <FormControl>
                <div className="flex space-x-1">
                  <Input placeholder="Warehouse ID" {...field} />
                  <SelectWarehouseButton
                    onSelect={(warehouse) => field.onChange(warehouse.id)}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Select a warehouse for the inventory.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createInventoryForm.control}
          name="productId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product ID</FormLabel>
              <FormControl>
                <div className="flex space-x-1">
                  <Input placeholder="Product ID" {...field} />
                  <SelectProductButton
                    onSelect={(product) => field.onChange(product.id)}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Select the product for the inventory.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createInventoryForm.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Quantity" {...field} />
              </FormControl>
              <FormDescription>
                Specify the available quantity in stock.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createInventoryForm.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Price" {...field} />
              </FormControl>
              <FormDescription>
                Enter the price of the inventory item.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createInventoryForm.control}
          name="minimumStockLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Stock Level</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Minimum Stock Level"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Specify the minimum stock level before replenishment is needed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createInventoryForm.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="IN_ACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Set the status to ACTIVE or INACTIVE.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full mt-4"
          type="submit"
          disabled={createInventoryMutation.isPending}
        >
          Create Inventory
        </Button>
      </form>
    </Form>
  );
};
