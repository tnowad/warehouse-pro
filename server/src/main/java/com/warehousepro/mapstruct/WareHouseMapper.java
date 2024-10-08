package com.warehousepro.mapstruct;


import com.warehousepro.dto.request.WareHouseRequest;
import com.warehousepro.dto.response.WareHouseResponse;
import com.warehousepro.entity.User;
import com.warehousepro.entity.Warehouse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface WareHouseMapper {
    Warehouse toWareHouse(WareHouseRequest warehouseRequest);
    WareHouseResponse toWareHouseResponse(Warehouse warehouse);
}
