package com.warehousepro.dto.request.shipment;


import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ListShipmentItemRequest {
  int page = 0;
  int pageSize = 10;
  String sort;
  String query;
  List<String> ids;
  String orderItemId;
  String shipmentId;
}
