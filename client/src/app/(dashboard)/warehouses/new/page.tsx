"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  type CreateWarehouseRequest,
  createWarehouseRequestSchema,
} from "@/lib/api/schemas/create-warehouse-request-schema";
import { useCreateWarehouseMutation } from "@/hooks/apis/warehouse";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function Page() {
  const { toast } = useToast();
  const router = useRouter();
  const createWarehouseForm = useForm<CreateWarehouseRequest>({
    resolver: zodResolver(createWarehouseRequestSchema),
    defaultValues: {
      name: "",
      capacity: 0,
      location: "",
    },
  });
  const createWarehouseMutation = useCreateWarehouseMutation();

  const onSubmit = createWarehouseForm.handleSubmit((values) => {
    createWarehouseMutation.mutate(values, {
      onSuccess(data) {
        createWarehouseForm.reset();
        toast({
          title: "Warehouse Created",
          description: "The warehouse has been created successfully.",
        });
        router.push(`/warehouses/${data.id}`);
      },
      onError(error) {
        toast({
          title: "Error",
          description: error.message,
        });
      },
    });
  });

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Create New Warehouse</CardTitle>
        <CardDescription>
          Fill out the form below to add a new warehouse to your management
          system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...createWarehouseForm}>
          <form onSubmit={onSubmit}>
            <FormField
              control={createWarehouseForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Warehouse" {...field} />
                  </FormControl>
                  <FormDescription>The name of the warehouse.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={createWarehouseForm.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="100" {...field} />
                  </FormControl>
                  <FormDescription>
                    The maximum capacity of the warehouse.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={createWarehouseForm.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="New York" {...field} />
                  </FormControl>
                  <FormDescription>
                    The location of the warehouse.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* TODO: Add query list users to assign role */}
            <Button type="submit" className="mt-4">
              Create Warehouse
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
