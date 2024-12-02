package com.warehousepro.dto.request.order;

import com.warehousepro.entity.OrderItemStatus;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateOrderItemRequest {
  String id;
  String productId;
  String warehouseId;
  Integer quantity;
  Double price;
  Double discount;
  OrderItemStatus status;
  UpdateOrderItemRequestType type;
}
