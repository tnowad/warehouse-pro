package com.warehousepro.dto.response.procurement;

import com.warehousepro.dto.response.supplier.SupplierResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProcurementReponse {
  String id;
  Date orderDate;
  Date deliveryDate;
  String status;
  Double totalCost;
  Date createdAt;
  SupplierResponse supplierResponse;
}
