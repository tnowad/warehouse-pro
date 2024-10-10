package com.warehousepro.dto.response.WareHouseResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SortedBy {
    String sortedBy;
    String orderBy;
}
