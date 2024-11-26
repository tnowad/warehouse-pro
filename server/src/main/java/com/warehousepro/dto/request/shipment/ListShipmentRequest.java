package com.warehousepro.dto.request.shipment;

import java.util.Date;
import java.util.List;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ListShipmentRequest {
  int page = 0;
  int pageSize = 10;
  String sort;
  String query;
  List<String> ids;
  Date shipmentDate;
  String status;
  String trackingNumber;
  String shippingMethod;
  Date deliveryEstimate;
  String carrier;
}
