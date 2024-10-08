package com.warehousepro.mapstruct;


import com.warehousepro.dto.request.WareHouseRequestDto;
import com.warehousepro.dto.response.WareHouseResponseDto;
import com.warehousepro.entity.User;
import com.warehousepro.entity.Warehouse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface WareHouseMapper {
    Warehouse toWareHouse(WareHouseRequestDto warehouseRequest);
    WareHouseResponseDto toWareHouseResponse(Warehouse warehouse);
}
