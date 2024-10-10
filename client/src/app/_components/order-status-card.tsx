import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

type OrderStatusCardProps = {
  warehouseIds: string[] | null;
};

export function OrderStatusCard({ warehouseIds }: OrderStatusCardProps) {
  const router = useRouter();
  const getOrderStatusQuery = useQuery(
    ["orderStatus", warehouseIds],
    async () => {
      return {
        items: [
          { id: "1", name: "Order 1", status: "Pending" },
          { id: "2", name: "Order 2", status: "Shipped" },
          { id: "3", name: "Order 3", status: "Delivered" },
          { id: "4", name: "Order 4", status: "Pending" },
          { id: "5", name: "Order 5", status: "Returned" },
        ],

        metadata: {
          pagination: {
            offset: 0,
            limit: 10,
            previousOffset: null,
            nextOffset: null,
            currentPage: 1,
            pageCount: 1,
            totalCount: 5,
          },
        },
      };
    },
  );

  const columns: ColumnDef<{
    id: string;
    name: string;
    status: string;
  }>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "status", header: "Status" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          variant={"ghost"}
          onClick={() => router.push(`/orders/${row.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Status</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={getOrderStatusQuery.data?.items ?? []}
        />
      </CardContent>
    </Card>
  );
}
