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
  supplierProductSchema,
  SupplierProductSchema,
} from "@/lib/schemas/supplier-product.schema";
import { useCreateSupplierProductMutation } from "@/hooks/mutations/create-supplier-product.mutation"; // Assuming this exists
import { SelectProductButton } from "../../../_components/select-product-button";

export type CreateSupplierProductFormProps = {
  supplierId: string;
};

export const CreateSupplierProductForm = ({
  supplierId,
}: CreateSupplierProductFormProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const createSupplierProductMutation = useCreateSupplierProductMutation();

  const createSupplierProductForm = useForm<SupplierProductSchema>({
    resolver: zodResolver(supplierProductSchema),
    defaultValues: {
      supplierId: supplierId,
      productId: "",
      leadTimeDays: 0,
      price: 0,
      availabilityStatus: "",
    },
  });

  const onSubmit = createSupplierProductForm.handleSubmit((values) => {
    createSupplierProductMutation.mutate(values, {
      onSuccess: () => {
        toast({
          title: "Supplier Product Created",
          description: "The new supplier product has been added successfully.",
        });
        router.push("/supplier-products");
      },
      onError: (error) => {
        toast({
          title: "Product Creation Failed",
          description: error.message,
        });
      },
    });
  });

  return (
    <Form {...createSupplierProductForm}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={createSupplierProductForm.control}
          name="supplierId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supplier ID</FormLabel>
              <FormControl>
                <Input placeholder="Supplier ID" {...field} readOnly />
              </FormControl>
              <FormDescription>Enter the supplier's unique ID.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createSupplierProductForm.control}
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
              <FormDescription>Enter the product's unique ID.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createSupplierProductForm.control}
          name="leadTimeDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lead Time (Days)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Lead Time in Days"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Specify the lead time in days for this product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createSupplierProductForm.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Price" {...field} />
              </FormControl>
              <FormDescription>
                Enter the price of the product from this supplier.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createSupplierProductForm.control}
          name="availabilityStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Availability Status</FormLabel>
              <FormControl>
                <Input placeholder="Availability Status" {...field} />
              </FormControl>
              <FormDescription>
                Enter the availability status of the product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full mt-4"
          type="submit"
          disabled={createSupplierProductMutation.isPending}
        >
          Create Supplier Product
        </Button>
      </form>
    </Form>
  );
};
