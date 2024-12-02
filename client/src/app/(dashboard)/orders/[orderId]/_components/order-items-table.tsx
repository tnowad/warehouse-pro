"use client";

import { useMemo, useState, useEffect } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  RowSelectionRow,
  RowSelectionState,
  RowModel,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTable } from "@/components/ui/data-table";
import { OrderItemSchema } from "@/lib/schemas/order-item.schema";
import { createGetOrderItemsQueryOptions } from "@/hooks/queries/get-order-items.query";
import { createListProductsQueryOptions } from "@/hooks/queries/list-products.query";
import { createListWarehousesQueryOptions } from "@/hooks/queries/list-warehouses.query";
import _ from "lodash";
import { ProductSchema } from "@/lib/schemas/product.schema";
import { WarehouseSchema } from "@/lib/schemas/warehouse.schema";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useForm } from "react-hook-form";
import {
  createBulkReturnBodySchema,
  CreateBulkReturnBodySchema,
} from "@/lib/apis/create-bulk-return.api";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { returnStatusSchema } from "@/lib/schemas/return.schema";
import { useCreateBulkReturnMutation } from "@/hooks/mutations/create-bulk-returns.mutation";

type OrderItemBulkActionDropdownProps = {
  selectedRowModel: RowModel<OrderItemSchema>;
};

export function OrderItemsBulkActionsDrowdown({
  selectedRowModel: selectedRows,
}: OrderItemBulkActionDropdownProps) {
  const createBulkReturnMutation = useCreateBulkReturnMutation();
  const createBulkReturnForm = useForm<CreateBulkReturnBodySchema>({
    resolver: zodResolver(createBulkReturnBodySchema),
    defaultValues: {
      reason: "",
      status: "PENDING",
      returnDate: "",
      orderItemIds: selectedRows.rows.map((row) => row.original.id),
    },
  });
  const onCreateBulkReturnSubmit = createBulkReturnForm.handleSubmit((values) =>
    createBulkReturnMutation.mutate(values),
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button>Bulk Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Return
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Return {selectedRows.rows.length}{" "}
                {selectedRows.rows.length > 1 ? "items" : "item"}
              </DialogTitle>
              <DialogDescription>
                <Form {...createBulkReturnForm}>
                  <form
                    onSubmit={onCreateBulkReturnSubmit}
                    className="space-y-4"
                  >
                    <FormField
                      control={createBulkReturnForm.control}
                      name="reason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reason</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="The reason for the return"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter the reason for the return.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={createBulkReturnForm.control}
                      name="returnDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Return Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              placeholder="The return date"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter the date of the return.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={createBulkReturnForm.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select the default status for return" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries({
                                [returnStatusSchema.enum.PENDING]: "Pending",
                                [returnStatusSchema.enum.APPROVED]: "Approved",
                                [returnStatusSchema.enum.REJECTED]: "Rejected",
                              }).map(([value, label]) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Select the status of the return.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit">Return</Button>
                  </form>
                </Form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface OrderItemsTableProps {
  orderId: string;
}

export function OrderItemsTable({ orderId }: OrderItemsTableProps) {
  const columns = useMemo<
    ColumnDef<
      OrderItemSchema & {
        product?: ProductSchema;
        warehouse?: WarehouseSchema;
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
        accessorKey: "productName",
        cell: ({ row }) => row.original.product?.name || row.original.productId,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Product Name" />
        ),
      },
      {
        accessorKey: "warehouseName",
        cell: ({ row }) =>
          row.original.warehouse?.name || row.original.warehouseId,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Warehouse Name" />
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
        accessorKey: "discount",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="" />
        ),
      },
      {
        accessorKey: "totalPrice",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Total" />
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
      },
    ],
    [],
  );

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const getOrderItemsQuery = useQuery(
    createGetOrderItemsQueryOptions({
      orderId,
    }),
  );

  const orderItems = useMemo(
    () => getOrderItemsQuery.data?.items ?? [],
    [getOrderItemsQuery.data?.items],
  );
  const rowCount = getOrderItemsQuery.data?.rowCount ?? 0;

  const listProductsQuery = useQuery({
    ...createListProductsQueryOptions({
      ids: _.uniq(_.map(orderItems, "productId")),
      pageSize: rowCount,
    }),
    enabled: rowCount > 0,
  });

  const listWarehouseQuery = useQuery({
    ...createListWarehousesQueryOptions({
      ids: _.uniq(_.map(orderItems, "warehouseId")),
      pageSize: rowCount,
    }),
    enabled: rowCount > 0,
  });

  const data = useMemo(() => {
    return orderItems.map((orderItem) => {
      const product = listProductsQuery.data?.items?.find(
        (p) => p.id === orderItem.productId,
      );
      const warehouse = listWarehouseQuery.data?.items?.find(
        (w) => w.id === orderItem.warehouseId,
      );
      return { ...orderItem, product: product, warehouse: warehouse };
    });
  }, [
    orderItems,
    listProductsQuery.data?.items,
    listWarehouseQuery.data?.items,
  ]);

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    rowCount,
    onPaginationChange: setPagination,
    enableRowSelection: () => true,
    state: {
      pagination,
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
  });

  return (
    <div>
      {(table.getIsAllRowsSelected() || table.getIsSomeRowsSelected()) && (
        <OrderItemsBulkActionsDrowdown
          selectedRowModel={table.getSelectedRowModel()}
        />
      )}
      <div className="border rounded-md">
        <DataTable
          table={table}
          status={getOrderItemsQuery.status}
          error={getOrderItemsQuery.error}
        />
      </div>
    </div>
  );
}
