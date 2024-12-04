package com.warehousepro.dto.request.shipment;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateShipmentTracking {
  String trackingEvent;
  Date eventDate;
  String location;
  String status;
}
