package com.warehousepro.dto.request.auth;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LoginRequest {

  @NotEmpty(message = "Không được bỏ trống email")
  private String email;

  @NotEmpty(message = "Không được bỏ trống mật khẩu")
  private String password;
}
