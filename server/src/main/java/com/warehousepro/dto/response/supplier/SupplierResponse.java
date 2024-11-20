package com.warehousepro.dto.response.supplier;

import java.util.Date;
import lombok.*;
import lombok.experimental.FieldDefaults;

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
