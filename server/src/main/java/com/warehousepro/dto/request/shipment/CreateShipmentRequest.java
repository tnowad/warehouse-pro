package com.warehousepro.dto.request.shipment;

import com.warehousepro.entity.Order;
import java.util.Date;
import lombok.*;
import lombok.experimental.FieldDefaults;

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
  String orderId;
}
