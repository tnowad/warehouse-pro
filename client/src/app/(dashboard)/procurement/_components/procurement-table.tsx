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
import { ProcurementSchema } from "@/lib/schemas/procurement.schema";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useReactTable } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import { listProcurementsQueryFilterSchema } from "@/lib/apis/list-procurements.api";
import { DataTable } from "@/components/ui/data-table";
import { createListProcurementsQueryOptions } from "@/hooks/queries/list-procurements.api";

export function ProcurementTable() {
  const columns = useMemo<ColumnDef<ProcurementSchema>[]>(
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
        accessorKey: "id",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Procurement ID" />
        ),
      },
      {
        accessorKey: "supplierId",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Supplier ID" />
        ),
      },
      {
        accessorKey: "orderDate",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Order Date" />
        ),
      },
      {
        accessorKey: "deliveryDate",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Delivery Date" />
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
      },
      {
        accessorKey: "totalCost",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Total Cost" />
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
                Copy Procurement ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/procurements/${row.original.id}`}>
                  View details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/procurements/${row.original.id}/edit`}>
                  Edit procurement
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
    createListProcurementsQueryOptions({
      query: globalFilter,
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,

      ...(listProcurementsQueryFilterSchema.safeParse(
        columnFilters.reduce(
          (acc, { id, value }) => ({ ...acc, [id]: value }),
          {},
        ),
      ).data ?? {}),

      sort: sorting
        .map(({ id, desc }) => `${id}:${desc ? "desc" : "asc"}`)
        .join(","),
    }),
  );

  const procurements = data?.items ?? [];
  const rowCount = data?.rowCount ?? 0;

  const table = useReactTable({
    data: procurements,
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
    <Card className="min-w-full max-w-full w-full">
      <CardHeader>
        <CardTitle>Procurements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center py-4 gap-2">
          <Input
            value={globalFilter ?? ""}
            onChange={(event) =>
              table.setGlobalFilter(String(event.target.value))
            }
            placeholder="Search..."
            className="max-w-sm"
          />
          <Button
            variant="outline"
            className="ml-auto"
            size={"sm"}
            onClick={() => {
              table.resetGlobalFilter();
              table.resetColumnFilters();
            }}
          >
            Clear Filter
          </Button>
          <DataTableViewOptions table={table} />
        </div>
        <div className="rounded-md border min-w-full max-w-full w-full">
          <DataTable table={table} status={status} error={error} />
        </div>
        <div className="mt-4">
          <DataTablePagination table={table} />
        </div>
      </CardContent>
    </Card>
  );
}
