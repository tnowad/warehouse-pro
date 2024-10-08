package com.warehousepro.controller;

import com.warehousepro.dto.request.WareHouseRequestDto;
import com.warehousepro.dto.response.WareHouseResponseDto;
import com.warehousepro.mapstruct.WareHouseMapper;
import com.warehousepro.service.WareHouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/warehouses")
public class WareHouseController {

    private WareHouseService warehouseService;

    private WareHouseMapper warehouseMapper;

    @GetMapping("/{id}")
    public WareHouseResponseDto getWarehouse(@PathVariable int id, @RequestBody WareHouseRequestDto warehouseRequest) {
        return warehouseMapper.toWareHouseResponse(warehouseService.getWareHouse(id, warehouseRequest));
    }

    @PostMapping
    public WareHouseResponseDto createWarehouse(@RequestBody WareHouseRequestDto warehouseRequest) {
        return warehouseMapper.toWareHouseResponse(warehouseService.createWareHouse(warehouseRequest));
    }

    @PutMapping("/{id}")
    public WareHouseResponseDto updateWarehouse(@PathVariable int id, @RequestBody WareHouseRequestDto warehouseRequest) {
        return warehouseMapper.toWareHouseResponse(warehouseService.updateWareHouse(id, warehouseRequest));
    }

    @DeleteMapping("/{id}")
    public String deleteWarehouse(@PathVariable int id) {
        warehouseService.deleteWareHouse(id);
        return "Delete success";
    }
}

