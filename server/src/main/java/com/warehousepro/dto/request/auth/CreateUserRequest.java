package com.warehousepro.dto.request.auth;

import java.util.Set;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateUserRequest {
  String name;
  String email;
  String password;
  Set<String> roleIds;
}
