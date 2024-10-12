package com.warehousepro.dto.request.auth;

import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDate;

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
