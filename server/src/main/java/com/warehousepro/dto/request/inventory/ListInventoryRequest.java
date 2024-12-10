package com.warehousepro.dto.request.inventory;

import java.util.List;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ListInventoryRequest {
  int page = 0;
  int pageSize = 10;
  String sort;
  String query;
  List<String> ids;
  List<String> warehouseIds;
  List<String> productIds;
  List<String> warehouseNames;
  List<String> productNames;
  String warehouse;
  String product;
  Integer quantity;
  Integer minimumStockLevel;
  String status;
  String createdAt;
  String updatedAt;
  Boolean lowStock;
}
