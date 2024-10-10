package com.warehousepro.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LoginRequest {

    @NotEmpty(message = "Không được bỏ trống user name")
    private String username;

    @NotEmpty(message = "Không được bỏ trống mật khẩu")
    private String password;
}
