package com.warehousepro.service;

import com.warehousepro.dto.request.WareHouseRequestDto;
import com.warehousepro.dto.request.WareHouseUpdateRequestDto;
import com.warehousepro.entity.Warehouse;
import com.warehousepro.mapstruct.WareHouseMapper;
import com.warehousepro.repository.WareHouseRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE , makeFinal = true)
public class WareHouseService {

    WareHouseRepository warehouseRepository;

    WareHouseMapper warehouseMapper;

    public List<Warehouse> getAllWareHouse(int limit, int offset) {
        Pageable pageable = PageRequest.of(offset / limit, limit);
        return warehouseRepository.findAll(pageable).getContent(); //not supported Exception
    }

    public int countAllWarehouses() {
        return (int)warehouseRepository.count();
    }

    public Warehouse getWareHouse(int warehouseId) {
        return warehouseRepository.findByWarehouseId(warehouseId).orElseThrow(); //not supported Exception
    }

    public Warehouse createWareHouse(WareHouseRequestDto warehouseRequest) {
        if(warehouseRepository.existsById(warehouseRequest.getWarehouseId()))
            throw new RuntimeException("WarehouseId was existed"); //not supported Exception
        return warehouseRepository.save(warehouseMapper.toWareHouse(warehouseRequest));
    }

    public Warehouse updateWareHouse(int warehouseId, WareHouseUpdateRequestDto wareHouseUpdateRequestDto) {
        Warehouse wareHouse = getWareHouse(warehouseId);

        warehouseMapper.updateWarehouse(wareHouse, wareHouseUpdateRequestDto);

        return warehouseRepository.save(wareHouse);
    }

    public void deleteWareHouse(int warehouseId) {
        warehouseRepository.deleteById(warehouseId);
    }
}

