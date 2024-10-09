package com.warehousepro.controller;

import com.warehousepro.dto.request.WareHouseRequestDto;
import com.warehousepro.dto.request.WareHouseUpdateRequestDto;
import com.warehousepro.dto.response.WareHouseResponse.Metadata;
import com.warehousepro.dto.response.WareHouseResponse.Pagination;
import com.warehousepro.dto.response.WareHouseResponse.WareHousePaginationResponseDto;
import com.warehousepro.dto.response.WareHouseResponse.WareHouseResponseDto;
import com.warehousepro.mapstruct.WareHouseMapper;
import com.warehousepro.service.WareHouseService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
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
    public WareHousePaginationResponseDto<WareHouseResponseDto> getAllWarehouse(
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "0") int offset){
        List<WareHouseResponseDto> items = warehouseService.getAllWareHouse(limit, offset).stream().map(warehouseMapper::toWareHouseResponse).toList();
        int totalCount = warehouseService.countAllWarehouses();
        int totalPageCount = (int) Math.ceil((double) totalCount / limit);
        Pagination pagination = new Pagination(offset, limit, Math.max(offset - limit, 0), Math.min(offset + limit, totalCount), offset / limit + 1, totalPageCount, totalCount);
        Metadata metadata = Metadata.builder().pagination(pagination).build();

        return new WareHousePaginationResponseDto<>(items, metadata);
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
    public ResponseEntity<Void> deleteWarehouse(@PathVariable("id") int id) {
        warehouseService.deleteWareHouse(id);
        return ResponseEntity.noContent().build();
    }
}

