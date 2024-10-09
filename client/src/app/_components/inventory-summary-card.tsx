import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "react-query";
type InventorySummaryCardProps = {
  warehouseIds: string[] | null;
};

export function InventorySummaryCard({
  warehouseIds,
}: InventorySummaryCardProps) {
  const { data: inventorySummary, isLoading } = useQuery(
    ["inventorySummary", warehouseIds],
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        totalStock: 1000,
        lowStock: 100,
      };
    },
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Inventory Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <div className="flex items-center space-x-2">
          <span>Total Stock:</span>
          <span>{inventorySummary?.totalStock}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>Low Stock:</span>
          <span>{inventorySummary?.lowStock}</span>
        </div>
      </CardContent>
    </Card>
  );
}
