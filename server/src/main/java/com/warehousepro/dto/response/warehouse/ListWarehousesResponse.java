package com.warehousepro.dto.response.warehouse;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ListWarehousesResponse {
    List<WareHouseResponse> items;
    Integer page;
    Integer pageSize;
}
