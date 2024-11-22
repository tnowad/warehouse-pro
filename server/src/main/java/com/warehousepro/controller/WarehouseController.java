package com.warehousepro.controller;

import com.warehousepro.dto.request.warehouse.CreateWareHouseRequest;
import com.warehousepro.dto.request.warehouse.ListWarehouseRequest;
import com.warehousepro.dto.request.warehouse.UpdateWarehouseRequestDto;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.warehouse.WareHouseResponse;
import com.warehousepro.mapstruct.WareHouseMapper;
import com.warehousepro.service.WarehouseService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/warehouses")
public class WarehouseController {

  WarehouseService warehouseService;

  WareHouseMapper warehouseMapper;

  @GetMapping
  public ResponseEntity<ItemResponse<WareHouseResponse>> getAllWarehouse(
      @ModelAttribute ListWarehouseRequest filterRequest) {
    return ResponseEntity.ok(warehouseService.getAllWarehouses(filterRequest));
  }

  @GetMapping("/{id}")
  public WareHouseResponse getWarehouse(@PathVariable("id") String id) {
    return warehouseMapper.toWarehouseResponse(warehouseService.getWareHouse(id));
  }

  @PostMapping
  public WareHouseResponse createWarehouse(@RequestBody CreateWareHouseRequest warehouseRequest) {
    return warehouseMapper.toWarehouseResponse(warehouseService.createWareHouse(warehouseRequest));
  }

  @PutMapping("/{id}")
  public WareHouseResponse updateWarehouse(
      @PathVariable("id") String id, @RequestBody UpdateWarehouseRequestDto warehouseRequest) {
    return warehouseMapper.toWarehouseResponse(
        warehouseService.updateWareHouse(id, warehouseRequest));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteWarehouse(@PathVariable("id") String id) {
    // TODO: Soft delete: Set `deleted_at` field to current date
    warehouseService.deleteWareHouse(id);
    // FIXME: Should return content instead of no content because this is a soft
    // delete operation
    return ResponseEntity.noContent().build();
  }

  @DeleteMapping("/{id}/hard-delete")
  public ResponseEntity<Void> hardDeleteWarehouse(@PathVariable("id") String id) {
    // TODO: Hard delete: Remove the record from the database
    throw new UnsupportedOperationException("Not implemented yet");
  }

  @PutMapping("/{id}/restore")
  public ResponseEntity<Void> restoreWarehouse(@PathVariable("id") String id) {
    // TODO: Restore: Set `deleted_at` field to null
    throw new UnsupportedOperationException("Not implemented yet");
  }

  // TODO: Bulk soft delete and bulk hard delete
}
