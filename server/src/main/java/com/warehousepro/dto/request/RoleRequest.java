package com.warehousepro.dto.request;


import com.warehousepro.entity.Permission;
import jakarta.persistence.ManyToMany;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoleRequest {

    String name;

    String des;

    LocalDate creareAt;

    LocalDate updateAt;

    Set<String> permissions;
}
