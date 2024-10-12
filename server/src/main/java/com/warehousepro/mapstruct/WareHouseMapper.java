package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.warehouse.CreateWareHouseRequest;
import com.warehousepro.dto.request.warehouse.UpdateWarehouseRequestDto;
import com.warehousepro.dto.response.warehouse.WareHouseResponseDto;
import com.warehousepro.entity.Warehouse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface WareHouseMapper {
  Warehouse toWareHouse(CreateWareHouseRequest warehouseRequest);

  WareHouseResponseDto toWareHouseResponse(Warehouse warehouse);

  void updateWarehouse(@MappingTarget Warehouse warehouse,
      UpdateWarehouseRequestDto wareHouseRequestDto);
}
