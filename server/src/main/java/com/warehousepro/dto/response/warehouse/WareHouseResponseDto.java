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
  String id;
  String name;
  String location;
  Integer capacity;
  LocalDate createdAt;
  LocalDate updatedAt;
}
