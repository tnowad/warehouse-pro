package com.warehousepro.dto.response.auth;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDate;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class UserResponse {
  String id;
  String email;
  String name;
  @JsonIgnore String password;
  LocalDate createdAt;
  LocalDate updatedAt;
}
