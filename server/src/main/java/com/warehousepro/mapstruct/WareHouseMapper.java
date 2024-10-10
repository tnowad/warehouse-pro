package com.warehousepro.mapstruct;


import com.warehousepro.dto.request.WareHouseRequestDto;
import com.warehousepro.dto.request.WareHouseUpdateRequestDto;
import com.warehousepro.dto.response.WareHouseResponse.WareHouseResponseDto;
import com.warehousepro.entity.Warehouse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface WareHouseMapper {
    Warehouse toWareHouse(WareHouseRequestDto warehouseRequest);
    WareHouseResponseDto toWareHouseResponse(Warehouse warehouse);
    void updateWarehouse(@MappingTarget Warehouse warehouse, WareHouseUpdateRequestDto wareHouseRequestDto);
}
