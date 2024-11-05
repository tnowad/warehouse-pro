"use client";

import { useMemo, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
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
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { RoleSchema } from "@/lib/schemas/role.schema";

import { useReactTable } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTable } from "@/components/ui/data-table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createListWarehouseRolesQueryOptions } from "@/hooks/queries/list-warehouse-roles.query";
import { listWarehouseRolesQueryFilterSchema } from "@/lib/apis/list-warehouse-roles.api";

type WarehouseRolesDetailsProps = {
  warehouseId: string;
};
export function WarehouseRolesDetails({
  warehouseId,
}: WarehouseRolesDetailsProps) {
  const columns = useMemo<ColumnDef<RoleSchema>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <span className="h-full flex justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </span>
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
        accessorKey: "description",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Description" />
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
                Copy Role ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/roles/${row.original.id}`}>View details</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/roles/${row.original.id}/edit`}>
                  Edit information
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [],
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const { data, error, status } = useQuery(
    createListWarehouseRolesQueryOptions(
      { warehouseId },
      {
        query: globalFilter,
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,

        ...(listWarehouseRolesQueryFilterSchema.safeParse(
          columnFilters.reduce(
            (acc, { id, value }) => ({ ...acc, [id]: value }),
            {},
          ),
        ).data ?? {}),

        sort: sorting
          .map(({ id, desc }) => `${id}:${desc ? "desc" : "asc"}`)
          .join(","),
      },
    ),
  );

  const roles = data?.items ?? [];
  const rowCount = data?.rowCount ?? 0;

  const table = useReactTable({
    data: roles,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    onGlobalFilterChange: setGlobalFilter,

    manualPagination: true,
    rowCount,
    onPaginationChange: setPagination,

    manualFiltering: true,

    manualSorting: true,
    enableMultiSort: true,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
      globalFilter,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">Warehouse Roles</CardTitle>
        <CardDescription>
          List of roles and permissions for the warehouse
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <DataTable table={table} status={status} error={error} />
        </div>
        <div className="mt-4">
          <DataTablePagination table={table} />
        </div>
      </CardContent>
    </Card>
  );
}
