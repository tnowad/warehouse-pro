package com.warehousepro.controller;

import com.warehousepro.dto.request.WareHouseRequestDto;
import com.warehousepro.dto.request.WareHouseUpdateRequestDto;
import com.warehousepro.dto.response.WareHouseResponseDto;
import com.warehousepro.mapstruct.WareHouseMapper;
import com.warehousepro.service.WareHouseService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE , makeFinal = true)
@RequestMapping("/warehouses")
public class WareHouseController {

    WareHouseService warehouseService;

    WareHouseMapper warehouseMapper;

    @GetMapping
    public List<WareHouseResponseDto> getAllWarehouse() {
        return warehouseService.getAllWareHouse().stream().map(warehouseMapper::toWareHouseResponse).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public WareHouseResponseDto getWarehouse(@PathVariable("id") int id) {
        return warehouseMapper.toWareHouseResponse(warehouseService.getWareHouse(id));
    }

    @PostMapping
    public WareHouseResponseDto createWarehouse(@RequestBody WareHouseRequestDto warehouseRequest) {
        return warehouseMapper.toWareHouseResponse(warehouseService.createWareHouse(warehouseRequest));
    }

    @PutMapping("/{id}")
    public WareHouseResponseDto updateWarehouse(@PathVariable("id") int id, @RequestBody WareHouseUpdateRequestDto warehouseRequest) {
        return warehouseMapper.toWareHouseResponse(warehouseService.updateWareHouse(id, warehouseRequest));
    }

    @DeleteMapping("/{id}")
    public String deleteWarehouse(@PathVariable("id") int id) {
        warehouseService.deleteWareHouse(id);
        return "Delete success";
    }
}

