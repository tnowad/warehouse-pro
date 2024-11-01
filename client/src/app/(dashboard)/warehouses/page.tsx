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
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { useInfiniteQuery } from "@tanstack/react-query";
import { createListWarehousesInfinityQueryOptions } from "@/hooks/queries/list-warehouses.query";

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
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
  },
  {
    accessorKey: "capacity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Capacity" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
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
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(row.original.id)}
          >
            Copy warehouse ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/warehouses/${row.original.id}`}>View details</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/warehouses/${row.original.id}/edit`}>
              Edit information
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

  const {
    data: warehouses,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    createListWarehousesInfinityQueryOptions({
      limit: pagination.pageSize,
    }),
  );

  const table = useReactTable({
    data: warehouses ? warehouses.pages.flatMap((page) => page.items) : [],
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Warehouses</h2>
        <Link href="/warehouses/new">
          <Button>Create Warehouse</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <DataTable table={table} />
      </CardContent>
    </Card>
  );
}
