package com.warehousepro.dto.request.auth;

import java.time.LocalDate;
import java.util.Set;
import lombok.*;
import lombok.experimental.FieldDefaults;

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
