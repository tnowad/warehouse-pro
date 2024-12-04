"use client";

import { useMemo, useState } from "react";
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  PaginationState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFacetedRowModel,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTable } from "@/components/ui/data-table";
import {
  returnSchema,
  returnStatusSchema,
  ReturnTableSchema,
} from "@/lib/schemas/return.schema"; // Ensure proper import
import { createListReturnsQueryOptions } from "@/hooks/queries/list-returns.query"; // Define the query hook
import Link from "next/link";
import _ from "lodash";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisIcon } from "lucide-react";

export function ReturnTable() {
  const columns = useMemo<ColumnDef<ReturnTableSchema>[]>(
    () => [
      {
        accessorKey: "returnDate",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Return Date" />
        ),
        cell: ({ row }) => row.original.returnDate,
      },
      {
        accessorKey: "reason",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Reason" />
        ),
        cell: ({ row }) => row.original.reason,
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => row.original.status,
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
                Copy return ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/returns/${row.original.id}`}>View details</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/returns/${row.original.id}/edit`}>
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
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    returnDate: true,
    reason: true,
    status: true,
    actions: true,
  });
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const listReturnsQuery = useQuery(
    createListReturnsQueryOptions({
      query: globalFilter,
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
      sort: sorting
        .map(({ id, desc }) => `${id}:${desc ? "desc" : "asc"}`)
        .join(","),
    }),
  );

  const returns = useMemo(
    () => listReturnsQuery.data?.items ?? [],
    [listReturnsQuery.data?.items],
  );
  const rowCount = listReturnsQuery.data?.rowCount ?? 0;

  const table = useReactTable({
    data: returns,
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
    <div>
      <div className="flex items-center gap-4 mb-4">
        <Input
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="max-w-xs"
        />
        <Button
          variant="outline"
          onClick={() => {
            setGlobalFilter("");
            setSorting([]);
            setColumnFilters([]);
          }}
        >
          Clear Filters
        </Button>
      </div>
      <div className="border rounded-md">
        <DataTable
          table={table}
          status={listReturnsQuery.status}
          error={listReturnsQuery.error}
        />
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
