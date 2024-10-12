package com.warehousepro.dto.response.warehouse;

import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class WareHouseResponseDto {
  int warehouseId;
  String warehouseName;
  String location;
  int capacity;
  int managerId;
  LocalDate createdAt;
  LocalDate updatedAt;
}
