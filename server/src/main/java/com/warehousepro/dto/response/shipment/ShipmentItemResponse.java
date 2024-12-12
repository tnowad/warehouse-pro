package com.warehousepro.dto.response.shipment;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShipmentItemResponse {
  String id;
  String shipmentId;
  String orderItemId;
}
