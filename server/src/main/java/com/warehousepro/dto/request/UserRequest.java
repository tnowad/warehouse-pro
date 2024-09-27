package com.warehousepro.dto.request;


import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserRequest {

    String id;

    String username;

    String password;

    String email;

    LocalDate createAt;

    LocalDate updateAt;

    Set<String> roles;
}
