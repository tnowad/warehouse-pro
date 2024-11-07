package com.warehousepro.dto.response.permission;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PermissionResponse {
  String name;
  String description;
  Date createdAt;
  Date updatedAt;
}
