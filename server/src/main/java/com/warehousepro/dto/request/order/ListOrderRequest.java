package com.warehousepro.dto.request.order;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ListOrderRequest {
  int page = 0;
  int pageSize = 10;
  String sort;
  String query;
  List<String> ids;
  String status;
  Double totalAmount;
  String paymentStatus;
  String shippingAddress;
}
