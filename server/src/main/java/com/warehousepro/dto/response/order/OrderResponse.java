package com.warehousepro.dto.response.order;

import java.util.Date;
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
  String status;
  Double totalAmount;
  String paymentStatus;
  String shippingAddress;
  Date createdAt;
  Date updatedAt;
}
