package com.warehousepro.dto.request.shipment;

import com.warehousepro.entity.Shipment;
import java.util.Date;
import lombok.*;
import lombok.experimental.FieldDefaults;

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
