package com.warehousepro.dto.request.warehouse;

import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateWareHouseRequest {
  int warehouseId;
  String warehouseName;
  String location;
  int capacity;
  int managerId;
}
