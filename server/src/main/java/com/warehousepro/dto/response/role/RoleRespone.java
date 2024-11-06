package com.warehousepro.dto.response.role;


import lombok.*;
import lombok.experimental.FieldDefaults;
import java.util.Date;


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
