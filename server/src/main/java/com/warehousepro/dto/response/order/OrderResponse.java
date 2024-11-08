package com.warehousepro.dto.response.order;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderResponse {
  String id;
  String status;
  Double totalAmount;
  String paymentStatus;
  String shippingAddress;
  Date createdAt;
  Date updatedAt;
}
