package com.warehousepro.controller;

import com.warehousepro.dto.request.inventory.CreateInventoryRequest;
import com.warehousepro.dto.request.inventory.ListInventoryRequest;
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

  @DeleteMapping("/{id}")
  public ResponseEntity<String> delete(@PathVariable("id") String id) {
    inventoryService.deleteInventory(id);
    return ResponseEntity.ok("Xóa thành công");
  }

  //  @GetMapping("/{id}")
  //  public ResponseEntity<Page<InventoryResponse>> findInventoryByProductId(
  //      @PathVariable("id") String id, Pageable pageable) {
  //    Page<Inventory> inventories = inventoryService.findAllByProductId(id, pageable);
  //    Page<InventoryResponse> inventoryResponses =
  //        inventories.map(inventoryMapper::toInventoryResponse);
  //    return ResponseEntity.ok(inventoryResponses);
  //  }
}
