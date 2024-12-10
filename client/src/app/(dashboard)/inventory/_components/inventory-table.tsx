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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTable } from "@/components/ui/data-table";
import Link from "next/link";
import { InventorySchema } from "@/lib/schemas/inventory.schema";
import { WarehouseSchema } from "@/lib/schemas/warehouse.schema";
import { ProductSchema } from "@/lib/schemas/product.schema";
import { createListInventoriesQueryOptions } from "@/hooks/queries/list-inventories.query";
import { listInventoriesQueryFilterSchema } from "@/lib/apis/list-inventories.api";
import { createListProductsQueryOptions } from "@/hooks/queries/list-products.query";
import { createListWarehousesQueryOptions } from "@/hooks/queries/list-warehouses.query";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DataTableViewOptions } from "@/components/ui/data-table-view-options";

type InventoryTableSchema = InventorySchema & {
  warehouse: WarehouseSchema;
} & {
  product: ProductSchema;
};

export function InventoryTable() {
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
        accessorKey: "warehouse",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Warehouse" />
        ),
        cell: ({ row }) => (
          <Link
            href={`/warehouses/${row.original.warehouseId}`}
            target="_blank"
          >
            {row.original.warehouse?.name || row.original.warehouseId}
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
            {row.original.product?.name || row.original.productId}
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
                Copy inventory ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/inventory/${row.original.id}`}>View details</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/inventory/${row.original.id}/edit`}>
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
      ...columnFilters,
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
    <Card className="min-w-full max-w-full w-full">
      <CardHeader>
        <CardTitle>Inventories</CardTitle>
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

          <Button size={"sm"} asChild>
            <Link href="/inventory/new">New</Link>
          </Button>
        </div>
        <div className="rounded-md border min-w-full max-w-full w-full">
          <DataTable table={table} status={status} />
        </div>
        <div className="mt-4">
          <DataTablePagination table={table} />
        </div>
      </CardContent>
    </Card>
  );
}
