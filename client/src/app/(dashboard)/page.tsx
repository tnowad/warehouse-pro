"use client";

import { useEffect, useState } from "react";
import { InventorySummaryCard } from "../_components/inventory-summary-card";
import { LowStockAlerts } from "../_components/low-stock-alerts";
import { OrderStatusCard } from "../_components/order-status-card";
import { RecentReceivings } from "../_components/recent-receivings";
import { RecentShipments } from "../_components/recent-shipments";
import { TotalStock } from "../_components/total-stock";
import { WarehouseDropdown } from "../_components/warehouse-dropdown";

export default function DashboardPage() {
  const [selectedWarehouseIds, setSelectedWarehouseIds] = useState<string[]>(
    [],
  );

  useEffect(() => {
    localStorage.setItem(
      "selectedWarehouseIds",
      JSON.stringify(selectedWarehouseIds),
    );
  }, [selectedWarehouseIds]);

  return (
    <div className="grid lg:grid-cols-2 gap-2 mx-4">
      <WarehouseDropdown onChange={setSelectedWarehouseIds} />
      <InventorySummaryCard warehouseIds={selectedWarehouseIds} />
      <div className="col-span-full">
        <LowStockAlerts warehouseIds={selectedWarehouseIds} />
      </div>
      <OrderStatusCard warehouseIds={selectedWarehouseIds} />
    </div>
  );
}
