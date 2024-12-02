package com.warehousepro.dto.request.supplierproduct;

import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ListSupplierProductRequest {
  int page = 1;
  int pageSize = 10;
  String sort;
  String query;
  List<String> ids;
  List<String> supplierIds;
  List<String> productIds;
  Integer leadTimeDays;
  Double price;
  String availabilityStatus;
  String supplierName;
  String productName;
}
