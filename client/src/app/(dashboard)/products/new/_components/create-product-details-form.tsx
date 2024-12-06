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
  createProductBodySchema,
  CreateProductBodySchema,
} from "@/lib/apis/create-product.api";
import { useCreateProductMutation } from "@/hooks/mutations/create-product.mutation";

export const CreateProductDetailsForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const createProductMutation = useCreateProductMutation();

  const createProductForm = useForm<CreateProductBodySchema>({
    resolver: zodResolver(createProductBodySchema),
    defaultValues: {
      name: "",
      description: "",
      sku: "",
    },
  });

  const onSubmit = createProductForm.handleSubmit((values) => {
    createProductMutation.mutate(values, {
      onSuccess: () => {
        toast({
          title: "Product created successfully",
          description: "The new product has been added.",
        });
        router.push("/products");
      },
      onError: (error) => {
        toast({
          title: "Product creation failed",
          description: error.message,
        });
      },
    });
  });

  return (
    <Form {...createProductForm}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={createProductForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Product Name" {...field} />
              </FormControl>
              <FormDescription>Enter the name of the product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createProductForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Product Description" {...field} />
              </FormControl>
              <FormDescription>
                Provide a short description of the product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createProductForm.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input placeholder="SKU" {...field} />
              </FormControl>
              <FormDescription>
                Enter the product's stock-keeping unit (SKU).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full mt-4"
          type="submit"
          disabled={createProductMutation.isPending}
        >
          Create Product
        </Button>
      </form>
    </Form>
  );
};
