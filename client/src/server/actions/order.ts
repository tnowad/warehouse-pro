"use server";

export async function getOrderStatus() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    items: [
      { id: "1", name: "Order 1", status: "Pending" },
      { id: "2", name: "Order 2", status: "Shipped" },
      { id: "3", name: "Order 3", status: "Delivered" },
      { id: "4", name: "Order 4", status: "Pending" },
      { id: "5", name: "Order 5", status: "Returned" },
    ],

    metadata: {
      pagination: {
        offset: 0,
        limit: 10,
        previousOffset: null,
        nextOffset: null,
        currentPage: 1,
        pageCount: 1,
        totalCount: 5,
      },
    },
  };
}
