package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.warehouse.CreateWareHouseRequest;
import com.warehousepro.dto.request.warehouse.UpdateWarehouseRequestDto;
import com.warehousepro.dto.response.warehouse.WareHouseResponse;
import com.warehousepro.entity.Warehouse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface WareHouseMapper {
  Warehouse toWarehouse(CreateWareHouseRequest warehouseRequest);

  WareHouseResponse toWarehouseResponse(Warehouse warehouse);

  void updateWarehouse(
      @MappingTarget Warehouse warehouse, UpdateWarehouseRequestDto wareHouseRequestDto);
}
