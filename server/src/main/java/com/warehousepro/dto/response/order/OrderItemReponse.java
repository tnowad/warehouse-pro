package com.warehousepro.dto.response.order;

import com.warehousepro.entity.Orders;
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
public class OrderItemReponse {
  String id;
  Integer quantity;
  Double price;
  Double totalPrice;
  Double discount;
  Orders order;
  Product product;
}
