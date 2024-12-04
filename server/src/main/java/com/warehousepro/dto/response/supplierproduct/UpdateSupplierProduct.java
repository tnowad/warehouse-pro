package com.warehousepro.dto.response.supplierproduct;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateSupplierProduct {
  Integer leadTimeDays;
  Double price;
  String availabilityStatus;
}
