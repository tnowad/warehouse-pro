package com.warehousepro.dto.response.role;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.warehousepro.dto.response.auth.PermissionResponse;
import java.util.Date;
import java.util.Set;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RoleRespone {
  String id;
  String name;
  String description;
  Date createdAt;
  Date updatedAt;
  Set<PermissionResponse> response;
}
