package com.warehousepro.dto.response.WareHouseResponse;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class Pagination {
    int offset;
    int limit;
    int previousOffset;
    int nextOffset;
    int currentPage;
    int pageCount;
    int totalCount;
}