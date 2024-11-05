package com.warehousepro.controller;

import com.warehousepro.dto.request.inventory.CreateInventoryRequest;

import com.warehousepro.dto.response.inventory.InventoryResponse;
import com.warehousepro.entity.Inventory;
import com.warehousepro.entity.Product;
import com.warehousepro.mapstruct.InventoryMapper;
import com.warehousepro.service.InventoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/inventorys")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class InventoryController {
  InventoryMapper inventoryMapper;
  InventoryService inventoryService;

  @PostMapping
  public ResponseEntity<InventoryResponse> create(@RequestBody CreateInventoryRequest request){
    Inventory inventory = inventoryService.createInventory(request);
    return ResponseEntity.ok(inventoryMapper.toInventoryResponse(inventory));
  }

  @GetMapping
  public ResponseEntity<Page<InventoryResponse>>  findProductByCriteria(@RequestParam Map<String, String> searchCriteria, Pageable pageable){
    Page<Inventory> inventories = inventoryService.findByCriteria(searchCriteria,pageable);
    Page<InventoryResponse> inventoryResponses = inventories.map(inventoryMapper::toInventoryResponse);
    return ResponseEntity.ok(inventoryResponses);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Page<InventoryResponse>> findInventoryByProductId(@PathVariable("id") String id,
                                                                          Pageable pageable){
    Page<Inventory> inventories = inventoryService.findAllByProductId(id, pageable);
    Page<InventoryResponse> inventoryResponses = inventories.map(inventoryMapper::toInventoryResponse);
    return ResponseEntity.ok(inventoryResponses);
  }



}
