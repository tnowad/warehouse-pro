import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useQuery } from "react-query";

type WarehouseStatusCardProps = {
  warehouseId: string | null;
};

export function WarehouseStatusCard({ warehouseId }: WarehouseStatusCardProps) {
  const getWarehouseStatusQuery = useQuery(
    ["warehouses", warehouseId],
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        id: warehouseId,
        name: "Warehouse 1",
        status: "Active",
        location: "New York, USA",
        lastUpdated: "2024-10-10 12:34 PM",
      };
    },
    {
      enabled: !!warehouseId,
    },
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Warehouse Status</CardTitle>
      </CardHeader>
      <CardContent>
        {getWarehouseStatusQuery.isIdle ? (
          "Not loaded"
        ) : getWarehouseStatusQuery.isLoading ? (
          "Loading..."
        ) : getWarehouseStatusQuery.isError ? (
          "Error"
        ) : (
          <div>
            <p>
              <strong>ID:</strong> {getWarehouseStatusQuery.data.id}
            </p>
            <p>
              <strong>Name:</strong> {getWarehouseStatusQuery.data.name}
            </p>
            <p>
              <strong>Location:</strong> {getWarehouseStatusQuery.data.location}
            </p>
            <p>
              <strong>Last Updated:</strong>{" "}
              {getWarehouseStatusQuery.data.lastUpdated}
            </p>
            <Badge
              variant={
                getWarehouseStatusQuery.data.status === "Active"
                  ? "default"
                  : "destructive"
              }
            >
              Status: {getWarehouseStatusQuery.data.status}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
