package com.warehousepro.controller;

import com.warehousepro.dto.request.shipment.CreateShipmentRequest;
import com.warehousepro.dto.request.shipment.ListShipmentRequest;
import com.warehousepro.dto.request.shipment.UpdateShipmentRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.shipment.ShipmentResponse;
import com.warehousepro.mapstruct.ShipmentMapper;
import com.warehousepro.service.ShipmentService;
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
  public ResponseEntity<ItemResponse<ShipmentResponse>> getAll(
      @ModelAttribute ListShipmentRequest listShipmentRequest) {
    return ResponseEntity.ok(shipmentService.getAll(listShipmentRequest));
  }

  @PutMapping("/{id}")
  public ResponseEntity<ShipmentResponse> update(@PathVariable("id") String id , @RequestBody UpdateShipmentRequest request){
    return ResponseEntity.ok(shipmentService.update(id, request));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ShipmentResponse> getById(@PathVariable("id") String id){
    return ResponseEntity.ok(shipmentService.getById(id));
  }


  @DeleteMapping("/{id}")
  public ResponseEntity<String> delete(@PathVariable("id") String id) {
    shipmentService.delete(id);
    return ResponseEntity.ok("xóa thành công");
  }
}
