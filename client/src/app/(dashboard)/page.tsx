"use client";

import { useEffect, useState } from "react";
import { SalesReportLineChartCard } from "./_components/sales-report-line-chart-card";

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
    <div className="">
      <SalesReportLineChartCard />
    </div>
  );
}
