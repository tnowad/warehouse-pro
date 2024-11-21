package com.warehousepro.dto.response.permission;

import java.util.Date;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PermissionResponse {
  String id;
  String name;
  String description;
  Date createdAt;
  Date updatedAt;
}
