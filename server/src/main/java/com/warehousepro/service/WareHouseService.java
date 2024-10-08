package com.warehousepro.service;

import com.warehousepro.dto.request.WareHouseRequestDto;
import com.warehousepro.dto.request.WareHouseUpdateRequestDto;
import com.warehousepro.dto.response.WareHouseResponseDto;
import com.warehousepro.entity.Warehouse;
import com.warehousepro.mapstruct.WareHouseMapper;
import com.warehousepro.repository.WareHouseRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE , makeFinal = true)
public class WareHouseService {

    WareHouseRepository warehouseRepository;

    WareHouseMapper warehouseMapper;

    public List<Warehouse> getAllWareHouse() {
        return warehouseRepository.findAll(); //not supported Exception
    }

    public Warehouse getWareHouse(int warehouse_id) {
        return warehouseRepository.findByWarehouseId(warehouse_id).orElseThrow(); //not supported Exception
    }

    public Warehouse createWareHouse(WareHouseRequestDto warehouseRequest) {
        if(warehouseRepository.existsById(warehouseRequest.getWarehouseId()))
            throw new RuntimeException("Warehouse_id was existed"); //not supported Exception
        return warehouseRepository.save(warehouseMapper.toWareHouse(warehouseRequest));
    }

    public Warehouse updateWareHouse(int warehouse_id, WareHouseUpdateRequestDto wareHouseUpdateRequestDto) {
        Warehouse wareHouse = getWareHouse(warehouse_id);

        warehouseMapper.updateWarehouse(wareHouse, wareHouseUpdateRequestDto);

        return warehouseRepository.save(wareHouse);
    }

    public void deleteWareHouse(int warehouse_id) {
        warehouseRepository.deleteById(warehouse_id);
    }
}

