package com.warehousepro.dto.request.order;

import com.warehousepro.entity.Order;
import com.warehousepro.entity.Product;
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
  Integer quantity;
  Double price;
  Double totalPrice;
  Double discount;
  Order order;
  Product product;
}