"use client";

import { InventorySummaryCard } from "../_components/inventory-summary-card";
import { OrderStatusCard } from "../_components/order-status-card";
import { WarehouseStatusCard } from "../_components/warehouse-status-card";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-2 gap-2 mx-4">
      <WarehouseStatusCard />
      <InventorySummaryCard />
      <OrderStatusCard />
    </div>
  );
}
