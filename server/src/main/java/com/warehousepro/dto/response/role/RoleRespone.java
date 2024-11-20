package com.warehousepro.dto.response.role;

import java.util.Date;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoleRespone {
  String name;
  String description;
  Date createdAt;
  Date updatedAt;
}
