"use server";

export async function getWarehouseStatus() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      id: 1,
      name: "Warehouse 1",
      status: "Active",
    },
    {
      id: 2,
      name: "Warehouse 2",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Warehouse 3",
      status: "Active",
    },
  ];
}
