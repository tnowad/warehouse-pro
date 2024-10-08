package com.warehousepro.dto.request;


import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WareHouseRequest {
    int warehouse_id;
    String warehouse_name;
    String location;
    int capacity;
    int manager_id;
    LocalDate created_at;
    LocalDate updated_at;
}
