package com.warehousepro.controller;

import com.warehousepro.dto.request.shipment.CreateShipmentTrackingRequest;
import com.warehousepro.dto.response.shipment.ShipmentTrackingResponse;
import com.warehousepro.entity.ShipmentTracking;
import com.warehousepro.mapstruct.ShipmentTrackingMapper;
import com.warehousepro.service.ShipmentTrackingService;
import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/shipments-tracking")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ShipmentTrackingController {
  ShipmentTrackingService service;
  ShipmentTrackingMapper mapper;

  @PostMapping
  public ResponseEntity<ShipmentTrackingResponse> create(
      @RequestBody CreateShipmentTrackingRequest request) {
    return ResponseEntity.ok(mapper.toShipmentTrackingResponse(service.create(request)));
  }

  @GetMapping
  public ResponseEntity<List<ShipmentTracking>> getAll() {
    return ResponseEntity.ok(service.getAll());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> delete(@PathVariable("id") String id) {
    service.delete(id);
    return ResponseEntity.ok("xóa thành công");
  }
}
