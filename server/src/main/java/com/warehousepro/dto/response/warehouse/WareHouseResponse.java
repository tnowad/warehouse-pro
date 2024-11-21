package com.warehousepro.dto.response.warehouse;

import java.time.LocalDate;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class WareHouseResponse {
  String id;
  String name;
  String location;
  Integer capacity;
  LocalDate createdAt;
  LocalDate updatedAt;
}
