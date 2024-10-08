package com.warehousepro.service;

import com.warehousepro.dto.request.WareHouseRequest;
import com.warehousepro.entity.Warehouse;
import com.warehousepro.mapstruct.WareHouseMapper;
import com.warehousepro.repository.WareHouseRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE , makeFinal = true)
public class WareHouseService {

    WareHouseRepository warehouseRepository;

    WareHouseMapper warehouseMapper;

    public Warehouse getWareHouse(int warehouse_id, WareHouseRequest warehouseRequest) {
        return warehouseRepository.findByWarehouseId(warehouse_id).orElseThrow(); //not supported Exception
    }

    public Warehouse createWareHouse(WareHouseRequest warehouseRequest) {
        if(warehouseRepository.existsById(warehouseRequest.getWarehouse_id()))
            throw new RuntimeException("Warehouse_id was existed"); //not supported Exception
        return warehouseRepository.save(warehouseMapper.toWareHouse(warehouseRequest));
    }

    public Warehouse updateWareHouse(int warehouse_id, WareHouseRequest warehouseRequest) {
        var existingWarehouse = warehouseRepository.findByWarehouseId(warehouse_id)
                .orElseThrow(RuntimeException::new); //not supported Exception

        existingWarehouse = warehouseMapper.toWareHouse(warehouseRequest);
        return warehouseRepository.save(existingWarehouse);
    }

    public void deleteWareHouse(int warehouse_id) {
        warehouseRepository.deleteById(warehouse_id);
    }
}

