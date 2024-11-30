"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InventorySchema } from "@/lib/schemas/inventory.schema";

import { Label } from "@/components/ui/label";
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
import { listInventoriesQueryFilterSchema } from "@/lib/apis/list-inventories.api";
import { createListInventoriesQueryOptions } from "@/hooks/queries/list-inventories.query";
import { createListProductsQueryOptions } from "@/hooks/queries/list-products.query";
import { ProductSchema } from "@/lib/schemas/product.schema";
import { createListWarehousesQueryOptions } from "@/hooks/queries/list-warehouses.query";
import { WarehouseSchema } from "@/lib/schemas/warehouse.schema";
import _ from "lodash";

export type SelectInventoryProductButtonProps = {
  onSelect: (
    inventory: InventorySchema & {
      maxQuantity: number;
    },
  ) => void;
};
function SelectInventoryProductButton({
  onSelect,
}: SelectInventoryProductButtonProps) {
  const columns = useMemo<
    ColumnDef<
      InventorySchema & {
        product: ProductSchema | undefined;
        warehouse: WarehouseSchema | undefined;
      }
    >[]
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
        accessorKey: "product",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Product" />
        ),
        cell: ({ row }) => (
          <Link href={`/products/${row.original.productId}`} target="_blank">
            {row.original.product?.name ?? row.original.productId}
          </Link>
        ),
      },
      {
        accessorKey: "quantity",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Quantity" />
        ),
      },
      {
        accessorKey: "price",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Price" />
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
      },
      {
        accessorKey: "warehouseId",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Warehouse ID" />
        ),
      },
      {
        accessorKey: "productId",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Product ID" />
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
              onSelect({
                ...row.original,
                maxQuantity: row.original.quantity,
              });
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
    warehouse: true,
    product: true,
    quantity: true,
    price: true,
    status: true,
    warehouseId: false,
    productId: false,
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

  const listInventoriesQuery = useQuery(
    createListInventoriesQueryOptions({
      query: globalFilter,
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
      ...(listInventoriesQueryFilterSchema.safeParse(
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
  const listProductsQuery = useQuery(
    createListProductsQueryOptions({
      ids: _.uniq(_.map(listInventoriesQuery.data?.items, "productId")),
      pageSize: pagination.pageSize,
    }),
  );

  const listWarehouseQuery = useQuery(
    createListWarehousesQueryOptions({
      ids: _.uniq(_.map(listInventoriesQuery.data?.items, "warehouseId")),
      pageSize: pagination.pageSize,
    }),
  );

  const inventories = useMemo(
    () => listInventoriesQuery.data?.items ?? [],
    [listInventoriesQuery.data?.items],
  );

  const products = useMemo(
    () => listProductsQuery.data?.items ?? [],
    [listProductsQuery.data?.items],
  );

  const warehouses = useMemo(
    () => listWarehouseQuery.data?.items ?? [],
    [listWarehouseQuery.data?.items],
  );
  const rowCount = listInventoriesQuery.data?.rowCount ?? 0;

  const data = useMemo(() => {
    return inventories.map((inventory) => {
      const product = _.find(products, { id: inventory.productId });
      const warehouse = _.find(warehouses, { id: inventory.warehouseId });
      return { ...inventory, product, warehouse };
    });
  }, [inventories, products, warehouses]);

  const table = useReactTable({
    data: data,
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
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} className="mx-auto">
          Select Product
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-screen-lg w-full max-h-screen flex flex-col"
        onWheel={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Select a product to add to the order</DialogTitle>
        </DialogHeader>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Inventory</CardTitle>
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
                status={status}
                error={listInventoriesQuery.error}
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

export { SelectInventoryProductButton };
