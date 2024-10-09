import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

type LowStockAlertsProps = {
  warehouseIds: string[] | null;
};
export function LowStockAlerts({ warehouseIds }: LowStockAlertsProps) {
  const router = useRouter();
  const { data: lowStockAlerts, isLoading } = useQuery(
    ["lowStockAlerts", warehouseIds],
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        items: [
          {
            warehouseId: "1",
            warehouseName: "Warehouse 1",
            productId: "1",
            productName: "Product 1",
            currentStock: 10,
            threshold: 20,
          },
          {
            warehouseId: "1",
            warehouseName: "Warehouse 1",
            productId: "2",
            productName: "Product 2",
            currentStock: 15,
            threshold: 20,
          },
          {
            warehouseId: "2",
            warehouseName: "Warehouse 2",
            productId: "1",
            productName: "Product 1",
            currentStock: 5,
            threshold: 20,
          },
          {
            warehouseId: "2",
            warehouseName: "Warehouse 2",
            productId: "2",
            productName: "Product 2",
            currentStock: 10,
            threshold: 20,
          },
        ],
      };
    },
    {
      enabled: !!warehouseIds,
    },
  );

  const columns: ColumnDef<{
    warehouseId: string;
    warehouseName: string;
    productId: string;
    productName: string;
    currentStock: number;
    threshold: number;
  }>[] = [
    { accessorKey: "warehouseId", header: "Warehouse ID" },
    { accessorKey: "warehouseName", header: "Warehouse Name" },
    { accessorKey: "productId", header: "Product ID" },
    { accessorKey: "productName", header: "Product Name" },
    { accessorKey: "currentStock", header: "Current Stock" },
    { accessorKey: "threshold", header: "Threshold" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          onClick={() =>
            router.push(
              `/warehouses/${row.original.warehouseId}/products/${row.original.productId}`,
            )
          }
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Low Stock Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={lowStockAlerts?.items ?? []} />
      </CardContent>
    </Card>
  );
}
