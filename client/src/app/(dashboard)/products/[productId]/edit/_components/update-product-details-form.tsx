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
import { cn } from "@/lib/utils";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useUpdateProductMutation } from "@/hooks/mutations/update-product.mutation";
import {
  updateProductBodySchema,
  UpdateProductBodySchema,
} from "@/lib/apis/update-product.api";
import { createGetProductDetailsQueryOptions } from "@/hooks/queries/get-product-details.query";

type ProductDetailsUpdateFormProps = {
  productId: string;
};

export const ProductDetailsUpdateForm = ({
  productId,
}: ProductDetailsUpdateFormProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const updateProductMutation = useUpdateProductMutation({ productId });

  const getProductDetailsQuery = useSuspenseQuery(
    createGetProductDetailsQueryOptions({ productId }),
  );

  const updateProductForm = useForm<UpdateProductBodySchema>({
    resolver: zodResolver(updateProductBodySchema),
    defaultValues: {
      ...getProductDetailsQuery.data,
    },
  });

  const onSubmit = updateProductForm.handleSubmit((values) => {
    updateProductMutation.mutate(values, {
      onSuccess: () => {
        toast({
          title: "Product updated successfully",
          description: "The product information has been updated.",
        });
        router.push("/products");
      },
      onError: (error) => {
        toast({
          title: "Product update failed",
          description: error.message,
        });
      },
    });
  });

  return (
    <Form {...updateProductForm}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={updateProductForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Product Name" {...field} />
              </FormControl>
              <FormDescription>Enter the product's name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={updateProductForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Product Description" {...field} />
              </FormControl>
              <FormDescription>Provide a short description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={updateProductForm.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input placeholder="SKU" {...field} />
              </FormControl>
              <FormDescription>Enter the product's SKU.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full mt-4"
          type="submit"
          disabled={
            updateProductMutation.isPending || getProductDetailsQuery.isLoading
          }
        >
          Update Product
        </Button>
      </form>
    </Form>
  );
};
