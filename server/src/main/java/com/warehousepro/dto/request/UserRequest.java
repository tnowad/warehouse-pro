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

    String username;

    String password;

    String email;

    LocalDate createdAt;

    LocalDate updatedAt;

//    Set<String> roles;
}
