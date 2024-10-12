package com.warehousepro.dto.request.auth;

import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDate;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoleRequest {

  String name;

  String des;

  LocalDate createdAt;

  LocalDate updatedAt;

  Set<String> permissions;
}
