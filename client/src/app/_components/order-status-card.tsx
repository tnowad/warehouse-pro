import { DataTable } from "@/components/ui/data-table";
import { getOrderStatus } from "@/server/actions/order";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "react-query";

export function OrderStatusCard() {
  const getOrderStatusQuery = useQuery("order-status", () => getOrderStatus());

  const columns: ColumnDef<{
    id: string;
    name: string;
    status: string;
  }>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "status", header: "Status" },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={getOrderStatusQuery.data?.items ?? []}
      />
    </div>
  );
}
