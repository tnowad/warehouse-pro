"use client";

import { useState } from "react";

import { useGetWarehouseListQuery } from "@/hooks/apis/warehouse";
import { GetWarehouseListQueryParams } from "@/lib/api/schemas/get-warehouse-list-schema";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { WarehouseResponseSchema } from "@/lib/api/schemas/warehouse-response-schema";

const columns: ColumnDef<WarehouseResponseSchema>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
];

export default function Page() {
  const [getWarehouseListQueryParams, setGetWarehouseListQueryParams] =
    useState<GetWarehouseListQueryParams>({});

  const getWarehouseListQuery = useGetWarehouseListQuery({
    params: getWarehouseListQueryParams,
  });

  return (
    <DataTable
      columns={columns}
      data={getWarehouseListQuery.data?.items ?? []}
    />
  );
}
