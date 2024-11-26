package com.warehousepro.controller;

import com.warehousepro.dto.request.shipment.CreateShipmentItemRequest;
import com.warehousepro.dto.response.shipment.ShipmentItemResponse;
import com.warehousepro.entity.ShipmentItem;
import com.warehousepro.mapstruct.ShipmentItemMapper;
import com.warehousepro.service.ShipmentItemService;
import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/shipment_items")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ShipmentItemController {
  ShipmentItemService service;
  ShipmentItemMapper mapper;

  @PostMapping
  public ResponseEntity<ShipmentItemResponse> create(
      @RequestBody CreateShipmentItemRequest request) {
    return ResponseEntity.ok(mapper.toShipmentItemResponse(service.create(request)));
  }

  @GetMapping
  public ResponseEntity<List<ShipmentItem>> getAll() {
    return ResponseEntity.ok(service.getAll());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> delete(@PathVariable("id") String id) {
    service.delete(id);
    return ResponseEntity.ok("xóa thành công");
  }
}
