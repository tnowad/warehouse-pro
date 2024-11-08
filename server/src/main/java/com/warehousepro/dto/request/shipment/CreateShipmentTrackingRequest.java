package com.warehousepro.dto.request.shipment;

import com.warehousepro.entity.Shipment;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateShipmentTrackingRequest {
  String trackingEvent;
  Date eventDate;
  String location;
  String status;
  Shipment shipment;
}
