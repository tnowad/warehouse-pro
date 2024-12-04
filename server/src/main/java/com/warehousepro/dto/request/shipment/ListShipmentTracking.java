package com.warehousepro.dto.request.shipment;

import com.warehousepro.entity.Shipment;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ListShipmentTracking {
  int page = 0;
  int pageSize = 10;
  String sort;
  String query;
  List<String> ids;
  String trackingEvent;
  Date eventDate;
  String location;
  String status;
  Shipment shipment;
}
