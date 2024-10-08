package com.warehousepro.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class WareHouseResponse {
    int warehouse_id;
    String warehouse_name;
    String location;
    int capacity;
    int manager_id;
    LocalDate created_at;
    LocalDate updated_at;
}
