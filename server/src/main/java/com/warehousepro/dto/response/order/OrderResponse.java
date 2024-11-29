package com.warehousepro.dto.response.order;

import java.util.Date;

import com.warehousepro.enums.OrderStatus;
import com.warehousepro.enums.PaymentStatus;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderResponse {
  String id;
  OrderStatus status;
  Double totalAmount;
  PaymentStatus paymentStatus;
  String shippingAddress;
  Date createdAt;
  Date updatedAt;
}
