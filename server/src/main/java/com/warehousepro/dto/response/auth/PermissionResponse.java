package com.warehousepro.dto.response.auth;

import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class PermissionResponse {
  String name;
  String description;
  LocalDate creareAt;
  LocalDate updateAt;
}
