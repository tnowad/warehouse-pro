import { DataTable } from "@/components/ui/data-table";
import { getInventorySummary } from "@/server/actions/inventory";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "react-query";

export function InventorySummaryCard() {
  const { data: inventorySummary, isLoading } = useQuery(
    "inventorySummary",
    () => getInventorySummary(),
  );

  const columns: ColumnDef<{
    warehouseId: string;
    totalStock: number;
    lowStock: number;
  }>[] = [
    {
      accessorKey: "warehouseId",
      header: "Warehouse ID",
    },
    {
      accessorKey: "totalStock",
      header: "Total Stock",
    },
    {
      accessorKey: "lowStock",
      header: "Low Stock",
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DataTable columns={columns} data={inventorySummary ?? []} />
    </div>
  );
}
