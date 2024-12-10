"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WarehouseSchema } from "@/lib/schemas/warehouse.schema";
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
import { PlusIcon } from "lucide-react";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReactTable } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createListWarehousesQueryOptions } from "@/hooks/queries/list-warehouses.query";

export type SelectWarehouseButtonProps = {
  onSelect: (warehouse: WarehouseSchema) => void;
};

function SelectWarehouseButton({ onSelect }: SelectWarehouseButtonProps) {
  const columns = useMemo<ColumnDef<WarehouseSchema>[]>(
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
          <DataTableColumnHeader column={column} title="Warehouse Name" />
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
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => {
              onSelect(row.original);
            }}
          >
            <PlusIcon />
          </Button>
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [onSelect],
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    select: true,
    name: true,
    location: true,
    capacity: true,
    createdAt: false,
    updatedAt: false,
    actions: true,
  });
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const listWarehousesQuery = useQuery(
    createListWarehousesQueryOptions({
      query: globalFilter,
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
      sort: sorting
        .map(({ id, desc }) => `${id}:${desc ? "desc" : "asc"}`)
        .join(","),
    }),
  );

  const warehouses = useMemo(
    () => listWarehousesQuery.data?.items ?? [],
    [listWarehousesQuery.data?.items],
  );

  const rowCount = listWarehousesQuery.data?.rowCount ?? 0;

  const data = useMemo(() => warehouses, [warehouses]);

  const table = useReactTable({
    data,
    columns,
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
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mx-auto">Select Warehouse</Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-screen-lg w-full max-h-screen flex flex-col"
        onWheel={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Select a Warehouse</DialogTitle>
        </DialogHeader>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Warehouses</CardTitle>
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
            <div className="h-96 w-full max-w-full max-h-96 overflow-auto">
              <DataTable
                table={table}
                status={listWarehousesQuery.status}
                error={listWarehousesQuery.error}
              />
            </div>
            <div className="mt-4">
              <DataTablePagination table={table} />
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

export { SelectWarehouseButton };
