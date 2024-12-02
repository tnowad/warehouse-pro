"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  updateSupplierBodySchema,
  UpdateSupplierBodySchema,
} from "@/lib/apis/update-supplier.api";
import { useUpdateSupplierMutation } from "@/hooks/mutations/update-supplier.mutation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createGetSupplierDetailsQuery } from "@/hooks/queries/get-supplier-details.query";

type UpdateSupplierFormProps = {
  supplierId: string;
};
export function UpdateSupplierForm({ supplierId }: UpdateSupplierFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { data: supplier } = useSuspenseQuery(
    createGetSupplierDetailsQuery({ supplierId }),
  );

  const updateSupplierMutation = useUpdateSupplierMutation({ supplierId });
  const form = useForm<UpdateSupplierBodySchema>({
    resolver: zodResolver(updateSupplierBodySchema),
    defaultValues: {
      name: supplier.name,
      address: supplier.address,
      contactInfo: supplier.contactInfo,
    },
  });

  const onSubmit = form.handleSubmit((values) =>
    updateSupplierMutation.mutate(values, {
      onSuccess() {
        toast({
          title: "Supplier updated successfully",
          description: "The supplier information has been updated.",
        });
        router.push("/suppliers");
      },
    }),
  );

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle>Update Supplier</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Supplier Name" {...field} />
                  </FormControl>
                  <FormDescription>Update the supplier's name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Info</FormLabel>
                  <FormControl>
                    <Input placeholder="Supplier Contact Info" {...field} />
                  </FormControl>
                  <FormDescription>
                    Update the supplier's contact information.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Supplier Address" {...field} />
                  </FormControl>
                  <FormDescription>
                    Update the supplier's address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full mt-4" type="submit">
              Update Supplier
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button variant="link" onClick={() => router.push("/suppliers")}>
          Back to Suppliers List
        </Button>
      </CardFooter>
    </Card>
  );
}
