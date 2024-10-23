package com.warehousepro.dto.request.warehouse;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateWarehouseRequestDto {
  String name;
  String location;
  Integer capacity;
}
