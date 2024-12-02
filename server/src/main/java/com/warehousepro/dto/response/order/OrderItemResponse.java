package com.warehousepro.dto.response.order;

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
public class OrderItemResponse {
  String id;
  String orderId;
  String productId;
  String warehouseId;
  Integer quantity;
  Double price;
  Double totalPrice;
  Double discount;
  OrderItemStatus status;
}
