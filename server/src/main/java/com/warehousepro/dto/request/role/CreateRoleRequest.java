package com.warehousepro.dto.request.role;


import lombok.*;
import lombok.experimental.FieldDefaults;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateRoleRequest {
  String name;
  String description;
}
