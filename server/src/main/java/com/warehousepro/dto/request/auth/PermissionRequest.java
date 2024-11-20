package com.warehousepro.dto.request.auth;

import java.time.LocalDate;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PermissionRequest {
  String name;

  String description;

  LocalDate createdAt;

  LocalDate updateAt;
}
