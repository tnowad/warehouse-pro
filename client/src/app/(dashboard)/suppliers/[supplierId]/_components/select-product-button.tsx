"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductSchema } from "@/lib/schemas/product.schema";
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
import Link from "next/link";
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
import { listProductsQueryFilterSchema } from "@/lib/apis/list-products.api";
import { createListProductsQueryOptions } from "@/hooks/queries/list-products.query";
import { createListWarehousesQueryOptions } from "@/hooks/queries/list-warehouses.query";
import { WarehouseSchema } from "@/lib/schemas/warehouse.schema";
import _ from "lodash";

export type SelectProductButtonProps = {
  onSelect: (product: ProductSchema) => void;
};

function SelectProductButton({ onSelect }: SelectProductButtonProps) {
  const columns = useMemo<
    ColumnDef<ProductSchema & { warehouse: WarehouseSchema | undefined }>[]
  >(
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
          <DataTableColumnHeader column={column} title="Product Name" />
        ),
        cell: ({ row }) => (
          <Link href={`/products/${row.original.id}`} target="_blank">
            {row.original.name}
          </Link>
        ),
      },
      {
        accessorKey: "sku",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="SKU" />
        ),
      },
      {
        accessorKey: "price",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Price" />
        ),
      },
      {
        accessorKey: "warehouseId",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Warehouse ID" />
        ),
      },
      {
        accessorKey: "warehouse",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Warehouse" />
        ),
        cell: ({ row }) => (
          <Link
            href={`/warehouses/${row.original.warehouseId}`}
            target="_blank"
          >
            {row.original.warehouse?.name ?? row.original.warehouseId}
          </Link>
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
    sku: true,
    price: true,
    warehouseId: false,
    warehouse: true,
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

  const listProductsQuery = useQuery(
    createListProductsQueryOptions({
      query: globalFilter,
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
      sort: sorting
        .map(({ id, desc }) => `${id}:${desc ? "desc" : "asc"}`)
        .join(","),
    }),
  );

  const listWarehouseQuery = useQuery(
    createListWarehousesQueryOptions({
      ids: _.uniq(_.map(listProductsQuery.data?.items, "warehouseId")),
      pageSize: pagination.pageSize,
    }),
  );

  const products = useMemo(
    () => listProductsQuery.data?.items ?? [],
    [listProductsQuery.data?.items],
  );
  const warehouses = useMemo(
    () => listWarehouseQuery.data?.items ?? [],
    [listWarehouseQuery.data?.items],
  );

  const rowCount = listProductsQuery.data?.rowCount ?? 0;

  const data = useMemo(() => {
    return products.map((product) => {
      const warehouse = _.find(warehouses, { id: product.warehouseId });
      return { ...product, warehouse };
    });
  }, [products, warehouses]);

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
        <Button lassName="mx-auto">Select Product</Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-screen-lg w-full max-h-screen flex flex-col"
        onWheel={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Select a product</DialogTitle>
        </DialogHeader>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Products</CardTitle>
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
                status={listProductsQuery.status}
                error={listProductsQuery.error}
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

export { SelectProductButton };
