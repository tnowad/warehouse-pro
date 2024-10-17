import { useMutation } from "@tanstack/react-query";

export function useGetWarehouseListQuery() {
  return useMutation({
    mutationKey: ["getWarehouseList"],
    mutationFn: async () => {
      return {
        items: [
          { id: "1", name: "Warehouse 1" },
          { id: "2", name: "Warehouse 2" },
          { id: "3", name: "Warehouse 3" },
          { id: "4", name: "Warehouse 4" },
          { id: "5", name: "Warehouse 5" },
        ],
      };
    },
  });
}
export function useGetWarehouseDetailsQuery() {}
export function useCreateWarehouseMutation() {}
export function useUpdateWarehouseMutation() {}
export function useDeleteWarehouseMutation() {}
