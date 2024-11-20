package com.warehousepro.controller;

import com.warehousepro.dto.request.shipment.CreateShipmentRequest;
import com.warehousepro.dto.response.shipment.ShipmentResponse;
import com.warehousepro.entity.Shipment;
import com.warehousepro.mapstruct.ShipmentMapper;
import com.warehousepro.service.ShipmentService;
import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/shipments")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ShipmentController {
  ShipmentService shipmentService;
  ShipmentMapper shipmentMapper;

  @PostMapping
  public ResponseEntity<ShipmentResponse> create(@RequestBody CreateShipmentRequest request) {
    return ResponseEntity.ok(shipmentMapper.toShipmentResponse(shipmentService.create(request)));
  }

  @GetMapping
  public ResponseEntity<List<Shipment>> getAll() {
    return ResponseEntity.ok(shipmentService.getAll());
  }
}
