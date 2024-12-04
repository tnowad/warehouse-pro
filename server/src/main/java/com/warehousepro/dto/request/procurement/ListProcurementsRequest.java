package com.warehousepro.dto.request.procurement;

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
public class ListProcurementsRequest {
  String query;
  Integer page;
  Integer pageSize;
  String sort;
  List<String> ids;
  List<String> supplierIds;
  String status;
  String orderDateFrom;
  String orderDateTo;
  String deliveryDateFrom;
  String deliveryDateTo;
}
