package com.warehousepro.dto.request.supplier;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateSupplierRequest {
  String name;
  String contact;
  String address;
}
