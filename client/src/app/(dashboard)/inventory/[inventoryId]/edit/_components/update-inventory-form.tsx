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
import { useUpdateInventoryMutation } from "@/hooks/mutations/update-inventory.mutation";
import { SelectWarehouseButton } from "../../../new/_components/_components/select-warehouse-button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { useSuspenseQuery } from "@tanstack/react-query";
import { updateInventoryBodySchema } from "@/lib/apis/update-inventory.api";
import { createGetInventoryDetailsQueryOptions } from "@/hooks/queries/get-inventory-details.query";

type UpdateInventoryFormProps = {
  inventoryId: string;
};

export const UpdateInventoryForm = ({
  inventoryId,
}: UpdateInventoryFormProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const { data: inventory } = useSuspenseQuery(
    createGetInventoryDetailsQueryOptions({ inventoryId }),
  );

  const updateInventoryMutation = useUpdateInventoryMutation({ inventoryId });

  const updateInventoryForm = useForm<InventorySchema>({
    resolver: zodResolver(updateInventoryBodySchema),
    defaultValues: {
      warehouseId: inventory.warehouseId,
      productId: inventory.productId,
      quantity: inventory.quantity,
      price: inventory.price,
      minimumStockLevel: inventory.minimumStockLevel,
      status: inventory.status,
    },
  });

  const onSubmit = updateInventoryForm.handleSubmit((values) => {
    updateInventoryMutation.mutate(values, {
      onSuccess: () => {
        toast({
          title: "Inventory Updated",
          description: "The inventory record has been updated successfully.",
        });
        router.push("/inventory");
      },
      onError: (error) => {
        toast({
          title: "Inventory Update Failed",
          description: error.message,
        });
      },
    });
  });

  return (
    <Form {...updateInventoryForm}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={updateInventoryForm.control}
          name="warehouseId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Warehouse ID</FormLabel>
              <FormControl>
                <div className="flex space-x-1">
                  <Input placeholder="Warehouse ID" {...field} readOnly />
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
          control={updateInventoryForm.control}
          name="productId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product ID</FormLabel>
              <FormControl>
                <div className="flex space-x-1">
                  <Input placeholder="Product ID" {...field} readOnly />
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
          control={updateInventoryForm.control}
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
          control={updateInventoryForm.control}
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
          control={updateInventoryForm.control}
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
          control={updateInventoryForm.control}
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
          disabled={updateInventoryMutation.isPending}
        >
          Update Inventory
        </Button>
      </form>
    </Form>
  );
};
