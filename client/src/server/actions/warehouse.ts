"use server";

export async function getWarehouseStatusCount() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    { status: "Active", count: 2 },
    { status: "Inactive", count: 1 },
  ];
}

export async function getWarehouseStatus() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    items: [
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
    ],

    metadata: {
      pagination: {
        offset: 0,
        limit: 10,
        previousOffset: null,
        nextOffset: null,
        currentPage: 1,
        pageCount: 1,
        totalCount: 3,
      },
    },
  };
}
