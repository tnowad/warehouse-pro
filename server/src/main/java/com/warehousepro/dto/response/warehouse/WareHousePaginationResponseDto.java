package com.warehousepro.dto.response.warehouse;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class WareHousePaginationResponseDto<T> {
    List<T> items;
    Metadata metadata;
}
