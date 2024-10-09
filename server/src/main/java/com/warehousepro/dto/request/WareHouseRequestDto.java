package com.warehousepro.dto.request;


import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WareHouseRequestDto {
    int warehouseId;
    String warehouseName;
    String location;
    int capacity;
    int managerId;
}
