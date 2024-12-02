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
  createSupplierBodySchema,
  CreateSupplierBodySchema,
} from "@/lib/apis/create-supplier.api";
import { useCreateSupplierMutation } from "@/hooks/mutations/create-supplier.mutation";

export function CreateSupplierForm() {
  const router = useRouter();
  const { toast } = useToast();

  const createSupplierMutation = useCreateSupplierMutation();
  const form = useForm<CreateSupplierBodySchema>({
    resolver: zodResolver(createSupplierBodySchema),
    defaultValues: {
      name: "",
      address: "",
      contactInfo: "",
    },
  });

  const onSubmit = form.handleSubmit((values) =>
    createSupplierMutation.mutate(values, {
      onSuccess() {
        toast({
          title: "Supplier added successfully",
          description: "The supplier has been added.",
        });
        router.push("/suppliers");
      },
    }),
  );

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle>Add Supplier</CardTitle>
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
                  <FormDescription>Enter the supplier's name.</FormDescription>
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
                    Enter the supplier's contact information.
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
                    Enter the supplier's address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full mt-4" type="submit">
              Add Supplier
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
