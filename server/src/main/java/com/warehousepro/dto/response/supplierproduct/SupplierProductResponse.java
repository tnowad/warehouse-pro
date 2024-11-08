package com.warehousepro.dto.response.supplierproduct;

import com.warehousepro.entity.Product;
import com.warehousepro.entity.Supplier;
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
  Supplier supplier;
  Product product;
}
