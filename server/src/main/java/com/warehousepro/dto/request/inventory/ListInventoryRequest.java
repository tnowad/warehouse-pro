package com.warehousepro.dto.request.inventory;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ListInventoryRequest {
  int page = 0;
  int pageSize = 10;
  String sort;
  String query;
  List<String> ids;
  Integer quantity;
  Integer minimumStockLevel;
  String status;
  String createdAt;
  String updatedAt;
}
