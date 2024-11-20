package com.warehousepro.dto.response.auth;

import java.time.LocalDate;
import lombok.*;
import lombok.experimental.FieldDefaults;

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
