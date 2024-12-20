package com.warehousepro.controller;

import com.warehousepro.dto.request.inventory.CreateInventoryRequest;
import com.warehousepro.dto.request.inventory.ListInventoryRequest;
import com.warehousepro.dto.request.inventory.UpdateInventoryRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.inventory.InventoryResponse;
import com.warehousepro.entity.Inventory;
import com.warehousepro.mapstruct.InventoryMapper;
import com.warehousepro.service.InventoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inventories")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class InventoryController {
  InventoryMapper inventoryMapper;
  InventoryService inventoryService;

  @PostMapping
  public ResponseEntity<InventoryResponse> create(@RequestBody CreateInventoryRequest request) {
    Inventory inventory = inventoryService.createInventory(request);
    return ResponseEntity.ok(inventoryMapper.toInventoryResponse(inventory));
  }

  @GetMapping
  public ResponseEntity<ItemResponse<InventoryResponse>> findProductByCriteria(
      @ModelAttribute ListInventoryRequest inventoryRequest) {
    return ResponseEntity.ok(inventoryService.getInventories(inventoryRequest));
  }

  @GetMapping("/{id}")
  public ResponseEntity<InventoryResponse> findById(@PathVariable("id") String id) {
    return ResponseEntity.ok(inventoryService.findById(id));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> delete(@PathVariable("id") String id) {
    inventoryService.deleteInventory(id);
    return ResponseEntity.ok("Xóa thành công");
  }

  @PutMapping("/{id}")
  public ResponseEntity<InventoryResponse> update(@PathVariable("id") String id,
      @RequestBody UpdateInventoryRequest request) {
    return ResponseEntity.ok(inventoryService.update(id, request));
  }

}
