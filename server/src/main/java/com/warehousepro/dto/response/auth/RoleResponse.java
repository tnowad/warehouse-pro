package com.warehousepro.dto.response.auth;

import java.time.LocalDate;
import java.util.Set;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class RoleResponse {
  String name;
  String description;
  LocalDate creareAt;
  LocalDate updateAt;
  Set<PermissionResponse> permissions;
}
