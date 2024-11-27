package com.warehousepro.dto.request.order;

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
public class UpdateOrderRequest {
  OrderStatus status;
  PaymentStatus paymentStatus;
  String shippingAddress;
}
