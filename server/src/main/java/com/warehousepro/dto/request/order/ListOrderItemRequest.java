package com.warehousepro.dto.request.order;

import com.warehousepro.entity.OrderItemStatus;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ListOrderItemRequest {
  int page = 1;
  int pageSize = 10;
  String sort;
  String query;
  List<String> ids;
  String productId;
  String warehouseId;
  Integer quantity;
  Double price;
  Double discount;
  OrderItemStatus status;
}
