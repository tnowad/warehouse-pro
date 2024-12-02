package com.warehousepro.dto.response.supplierproduct;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SupplierProductResponse {
  String id;
  Integer leadTimeDays;
  Double price;
  String availabilityStatus;
  String supplierId;
  String productId;
}
