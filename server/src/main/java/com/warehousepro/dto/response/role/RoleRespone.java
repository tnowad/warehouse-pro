package com.warehousepro.dto.response.role;

import java.util.Date;
import java.util.Set;

import com.warehousepro.dto.response.auth.PermissionResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoleRespone {
  String id;
  String name;
  String description;
  Date createdAt;
  Date updatedAt;
  Set<PermissionResponse> response;
}
