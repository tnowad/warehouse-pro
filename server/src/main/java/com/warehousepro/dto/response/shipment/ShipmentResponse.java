package com.warehousepro.dto.response.shipment;

import com.warehousepro.dto.response.order.OrderResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShipmentResponse {
  String id;
  Date shipmentDate;
  String status;
  String trackingNumber;
  String shippingMethod;
  Date deliveryEstimate;
  String carrier;
  OrderResponse order;
}
