"use client";

import { useEffect, useState } from "react";

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

  return <div className="grid lg:grid-cols-2 gap-2 mx-4"></div>;
}
