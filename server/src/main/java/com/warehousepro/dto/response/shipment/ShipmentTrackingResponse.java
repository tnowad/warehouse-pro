package com.warehousepro.dto.response.shipment;


import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShipmentTrackingResponse {
  String id;
  String trackingEvent;
  Date eventDate;
  String location;
  String status;
  ShipmentResponse shipment;
}
