package com.warehousepro.dto.response.auth;

import com.warehousepro.entity.User;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LoginResponse {
  String token;
  UserResponse user;
}
