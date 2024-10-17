package com.warehousepro.dto.request.auth;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import jakarta.validation.constraints.NotBlank;

@Data
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RefreshTokenRequest {
  @NotBlank
  String refreshToken;
}
