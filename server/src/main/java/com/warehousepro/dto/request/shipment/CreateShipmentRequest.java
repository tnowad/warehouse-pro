package com.warehousepro.dto.request.shipment;

import com.warehousepro.entity.Order;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateShipmentRequest {
  Date shipmentDate;
  String status;
  String trackingNumber;
  String shippingMethod;
  Date deliveryEstimate;
  String carrier;
  Order order;
}
