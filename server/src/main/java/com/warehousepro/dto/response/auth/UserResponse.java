package com.warehousepro.dto.response.auth;

import com.warehousepro.dto.response.role.RoleRespone;
import java.time.LocalDate;
import java.util.Set;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class UserResponse {
  String id;
  String email;
  String name;
  LocalDate createdAt;
  LocalDate updatedAt;
  Set<RoleRespone> roleRespones;
}
