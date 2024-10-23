"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetWarehouseDetailsQuery } from "@/hooks/apis/warehouse";
import { CopyIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type WarehouseDetailProps = {
  warehouseId: string;
};
export function WarehouseDetails({ warehouseId }: WarehouseDetailProps) {
  const router = useRouter();
  const warehouseDetailsQuery = useGetWarehouseDetailsQuery(warehouseId);

  const warehouse = warehouseDetailsQuery.data;

  if (warehouseDetailsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (warehouseDetailsQuery.isError) {
    return <div>Error</div>;
  }

  if (!warehouse) {
    return <div>Warehouse not found</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          {warehouse.name}
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={() => {
              window.navigator.clipboard.writeText(warehouse.id);
            }}
          >
            <CopyIcon />
            <span className="sr-only">Copy Warehouse ID</span>
          </Button>
        </CardTitle>
        <CardDescription>Updated: {warehouse.updatedAt}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="font-semibold">Warehouse Information</div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div>Name</div>
              <div>{warehouse.name}</div>
            </div>

            <div>
              <div>Capacity</div>
              <div>{warehouse.capacity}</div>
            </div>

            <div>
              <div>Location</div>
              <div>{warehouse.location}</div>
            </div>

            <div>
              <div>Created At</div>
              <div>{warehouse.createdAt}</div>
            </div>

            <div>
              <div>Updated At</div>
              <div>{warehouse.updatedAt}</div>
            </div>
          </div>
        </div>
        <Separator />
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button size={"sm"} variant={"ghost"}>
          Delete
        </Button>
        <Button size={"sm"} variant={"ghost"}>
          Deactivate
        </Button>
        <Button
          size={"sm"}
          onClick={() => {
            router.push(`/warehouses/${warehouse.id}/edit`);
          }}
        >
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
}
