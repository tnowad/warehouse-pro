package com.warehousepro.dto.request.order;

import com.warehousepro.entity.Order;
import com.warehousepro.entity.Product;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateOrderItemRequest {
  String warehouseId;
  Double price;
  Double discount;
  String productId;
  Integer quantity;
}
