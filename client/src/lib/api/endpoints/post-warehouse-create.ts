export async function postWarehouseCreate(
  data: any,
  config?: any,
): Promise<any> {
  const response = await apiClient.post("/warehouse", data, {
    ...config,
  });
}
