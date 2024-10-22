"use client";

import { useState } from "react";

import { useGetWarehouseListQuery } from "@/hooks/apis/warehouse";
import { DataTable } from "@/components/ui/data-table";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { WarehouseResponseSchema } from "@/lib/api/schemas/warehouse-response-schema";
import { Checkbox } from "@/components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const columns: ColumnDef<WarehouseResponseSchema>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <EllipsisIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/warehouses/${row.original.id}`}>View</Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={`/dashboard/warehouses/${row.original.id}/edit`}>
              Edit
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

export default function Page() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const getWarehouseListQuery = useGetWarehouseListQuery({
    params: {
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
    },
  });

  const table = useReactTable({
    data: getWarehouseListQuery.data?.items ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    rowCount: getWarehouseListQuery.data?.metadata.pagination.totalCount,
    state: {
      pagination,
      sorting,
      columnFilters,
    },
  });

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Warehouses</h2>
        <Link href="/dashboard/warehouses/create">
          <Button>Create Warehouse</Button>
        </Link>
      </CardHeader>

      <CardContent>
        <DataTable table={table} />
      </CardContent>
    </Card>
  );
}
