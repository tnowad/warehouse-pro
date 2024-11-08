package com.warehousepro.dto.response.supplier;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SupplierResponse {
  String id;
  String name;
  String contact;
  String address;
  Date createdAt;
  Date updatedAt;
}
