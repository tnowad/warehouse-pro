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
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTable } from "@/components/ui/data-table";
import { shipmentSchema } from "@/lib/schemas/shipment.schema";
import { useQuery } from "@tanstack/react-query";
import { createListShipmentsQueryOptions } from "@/hooks/queries/list-shipments.query";
import _ from "lodash";

type ShipmentTableSchema = z.infer<typeof shipmentSchema>;

export function ShipmentTable() {
  const columns = useMemo<ColumnDef<ShipmentTableSchema>[]>(
    () => [
      {
        accessorKey: "orderId",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Order ID" />
        ),
      },
      {
        accessorKey: "shipmentDate",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Shipment Date" />
        ),
        cell: ({ row }) =>
          new Date(row.original.shipmentDate).toLocaleDateString(),
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
      },
      {
        accessorKey: "trackingNumber",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Tracking Number" />
        ),
      },
      {
        accessorKey: "shippingMethod",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Shipping Method" />
        ),
      },
      {
        accessorKey: "deliveryEstimate",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Delivery Estimate" />
        ),
        cell: ({ row }) =>
          new Date(row.original.deliveryEstimate).toLocaleDateString(),
      },
      {
        accessorKey: "carrier",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Carrier" />
        ),
      },
    ],
    [],
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    orderId: true,
    shipmentDate: true,
    status: true,
    trackingNumber: true,
    shippingMethod: true,
    deliveryEstimate: true,
    carrier: true,
  });
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const listShipmentsQuery = useQuery(
    createListShipmentsQueryOptions({
      query: globalFilter,
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
      sort: sorting
        .map(({ id, desc }) => `${id}:${desc ? "desc" : "asc"}`)
        .join(","),
    }),
  );

  const shipments = useMemo(
    () => listShipmentsQuery.data?.items ?? [],
    [listShipmentsQuery.data?.items],
  );
  const rowCount = listShipmentsQuery.data?.rowCount ?? 0;

  const table = useReactTable({
    data: shipments,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
          status={listShipmentsQuery.status}
          error={listShipmentsQuery.error}
        />
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
