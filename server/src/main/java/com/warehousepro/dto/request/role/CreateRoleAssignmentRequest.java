package com.warehousepro.dto.request.role;

import com.warehousepro.entity.Role;
import com.warehousepro.entity.Warehouse;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateRoleAssignmentRequest {
  Warehouse warehouse;
  Role role;
}
