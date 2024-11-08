package com.warehousepro.dto.request.supplier;

import com.warehousepro.entity.Procurement;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

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
