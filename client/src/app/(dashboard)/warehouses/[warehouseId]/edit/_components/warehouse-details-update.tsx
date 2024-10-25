"use client";

import {
  createGetWarehouseDetailsOptions,
  useUpdateWarehouseDetailsMutation,
} from "@/hooks/apis/warehouse";
import {
  PostWarehouseDetailsUpdateRequestSchema,
  postWarehouseDetailsUpdateRequestSchema,
} from "@/lib/api/schemas/post-warehouse-details-update-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type WarehouseDetailsUpdateProps = {
  warehouseId: string;
};
export function WarehouseDetailsUpdate({
  warehouseId,
}: WarehouseDetailsUpdateProps) {
  const { toast } = useToast();
  const warehouseDetailsQuery = useSuspenseQuery(
    createGetWarehouseDetailsOptions(warehouseId),
  );
  const updateWarehouseDetailsMutation =
    useUpdateWarehouseDetailsMutation(warehouseId);
  const updateWarehouseDetailsForm =
    useForm<PostWarehouseDetailsUpdateRequestSchema>({
      resolver: zodResolver(postWarehouseDetailsUpdateRequestSchema),
      defaultValues: {
        id: warehouseDetailsQuery.data?.id ?? "",
        name: warehouseDetailsQuery.data?.name ?? "",
        capacity: warehouseDetailsQuery.data?.capacity ?? 0,
        location: warehouseDetailsQuery.data?.location ?? "",
      },
    });

  const onSubmit = updateWarehouseDetailsForm.handleSubmit((values) => {
    updateWarehouseDetailsMutation.mutate(values, {
      onSuccess(data) {
        toast({
          title: "Warehouse Updated",
          description: "The warehouse has been updated successfully.",
        });
        updateWarehouseDetailsForm.reset(data);
      },
      onError(error) {
        toast({
          title: "Error",
          description: error.message,
        });
      },
    });
  });

  if (warehouseDetailsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (warehouseDetailsQuery.isError) {
    return <div>Error</div>;
  }

  if (!warehouseDetailsQuery.data) {
    return <div>Warehouse not found</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Warehouse Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...updateWarehouseDetailsForm}>
          <form onSubmit={onSubmit}>
            <FormField
              control={updateWarehouseDetailsForm.control}
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
              control={updateWarehouseDetailsForm.control}
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
              control={updateWarehouseDetailsForm.control}
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
          </form>
        </Form>
      </CardContent>
      <CardFooter className="gap-2 justify-end">
        <Button
          onClick={() => updateWarehouseDetailsForm.reset()}
          size={"sm"}
          variant={"outline"}
        >
          Reset
        </Button>
        <Button size={"sm"} onClick={onSubmit}>
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
