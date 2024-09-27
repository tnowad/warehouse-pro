package com.warehousepro.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class RoleResponse {
    String name;
    String description;
    LocalDate creareAt;
    LocalDate updateAt;
    Set<PermissionResponse> permissions;
}
