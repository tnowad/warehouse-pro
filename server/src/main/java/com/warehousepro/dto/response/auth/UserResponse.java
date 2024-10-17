package com.warehousepro.dto.response.auth;

import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDate;

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
}
