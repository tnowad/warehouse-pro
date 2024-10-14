package com.warehousepro.dto.request.auth;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LoginRequest {

  @Parameter(schema = @Schema(type = "string", format = "email"))
  private String email;

  @Parameter(schema = @Schema(type = "string", format = "password"))
  private String password;
}
