"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createOrderBodySchema,
  CreateOrderBodySchema,
} from "@/lib/apis/create-order.api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InventorySchema } from "@/lib/schemas/inventory.schema";

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
import { EllipsisIcon } from "lucide-react";
import Link from "next/link";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { UserSchema } from "@/lib/schemas/user.schema";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReactTable } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { createListUsersQueryOptions } from "@/hooks/queries/list-users.query";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import { listUsersQueryFilterSchema } from "@/lib/apis/list-users.api";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  listInventoriesApi,
  listInventoriesQueryFilterSchema,
} from "@/lib/apis/list-inventories.api";
import { createListInventoriesQueryOptions } from "@/hooks/queries/list-inventories.query";
import { createListProductsQueryOptions } from "@/hooks/queries/list-products.query";
import { ProductSchema } from "@/lib/schemas/product.schema";

export function InventoryTable() {
  const columns = useMemo<
    ColumnDef<
      InventorySchema & {
        product: ProductSchema | undefined;
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
        accessorKey: "product",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Product" />
        ),
        cell: ({ row }) => <span>{row.original.product?.name ?? "N/A"}</span>,
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
                Copy Inventory ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/inventories/${row.original.id}`}>
                  View details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/inventories/${row.original.id}/edit`}>
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
      ids: listInventoriesQuery.data?.items.map(
        (inventory) => inventory.productId,
      ),
      pageSize: pagination.pageSize,
    }),
  );

  const inventories = listInventoriesQuery.data?.items ?? [];
  const products = listProductsQuery.data?.items ?? [];
  const rowCount = listInventoriesQuery.data?.rowCount ?? 0;

  const data = inventories.map((inventory) => {
    const product = products.find(
      (product) => product.id === inventory.productId,
    );
    return {
      ...inventory,
      product,
    };
  });

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
  );
}
export type SelectProductButtonProps = {
  onSelect: (inventory: InventorySchema) => void;
};
export function SelectProductButton({ onSelect }: SelectProductButtonProps) {
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
        <InventoryTable />
      </DialogContent>
    </Dialog>
  );
}

export default function Page() {
  const createOrderForm = useForm<CreateOrderBodySchema>({
    resolver: zodResolver(createOrderBodySchema),
    values: {
      shippingAddress: "",
      paymentStatus: "PENDING",
      status: "PENDING",
      items: [],
    },
  });

  const orderItemsFieldArray = useFieldArray({
    control: createOrderForm.control,
    name: "items",
  });

  const onSubmit = createOrderForm.handleSubmit(async (values) => {});

  return (
    <Form {...createOrderForm}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={createOrderForm.control}
          name="shippingAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shipping Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter the shipping address" {...field} />
              </FormControl>
              <FormDescription>
                Enter the shipping address of the order.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createOrderForm.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select order status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="PROCESSING">Processing</SelectItem>
                  <SelectItem value="SHIPPED">Shipped</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select the status of the order.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createOrderForm.control}
          name="paymentStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="PAID">Paid</SelectItem>
                  <SelectItem value="FAILED">FAILED</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the payment status of the order.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Warehouse</TableHead>
              <TableHead>Inventory</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Subtotal</TableHead>
              <TableHead>
                <SelectProductButton
                  onSelect={(inventory) => {
                    orderItemsFieldArray.append({
                      inventoryId: inventory.id,
                      productId: inventory.productId,
                      price: inventory.price,
                      quantity: 1,
                      discount: 0,
                    });
                  }}
                />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderItemsFieldArray.fields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell>{field.inventoryId}</TableCell>
                <TableCell>{field.productId}</TableCell>
                <TableCell>
                  <FormField
                    control={createOrderForm.control}
                    name={`items.${index}.quantity`}
                    render={({ field }) => (
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={createOrderForm.control}
                    name={`items.${index}.price`}
                    render={({ field }) => (
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={createOrderForm.control}
                    name={`items.${index}.discount`}
                    render={({ field }) => (
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                    )}
                  />
                </TableCell>
                <TableCell>
                  {field.price * field.quantity - field.discount}
                </TableCell>
                <TableCell>
                  <Button onClick={() => orderItemsFieldArray.remove(index)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button
          className="w-full mt-4"
          type="submit"
          disabled={
            createOrderForm.formState.isSubmitting ||
            !createOrderForm.formState.isValid
          }
        >
          Create Order
        </Button>
      </form>
    </Form>
  );
}
