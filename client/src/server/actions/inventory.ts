"use server";

export async function getInventorySummary() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    { warehouseId: "1", name: "Warehouse 1", totalStock: 100, lowStock: 10 },
    { warehouseId: "2", name: "Warehouse 2", totalStock: 200, lowStock: 20 },
    { warehouseId: "3", name: "Warehouse 3", totalStock: 300, lowStock: 30 },
    { warehouseId: "4", name: "Warehouse 4", totalStock: 400, lowStock: 40 },
  ];
}
