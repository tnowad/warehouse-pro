package com.warehousepro.dto.response.shipment;

import com.warehousepro.dto.response.order.OrderResponse;
import java.util.Date;
import lombok.*;
import lombok.experimental.FieldDefaults;

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
