package com.warehousepro.controller;

import com.warehousepro.dto.request.shipment.CreateShipmentItemRequest;
import com.warehousepro.dto.request.shipment.CreateShipmentRequest;
import com.warehousepro.dto.response.shipment.ShipmentItemResponse;
import com.warehousepro.dto.response.shipment.ShipmentResponse;
import com.warehousepro.entity.Shipment;
import com.warehousepro.entity.ShipmentItem;
import com.warehousepro.mapstruct.ShipmentItemMapper;
import com.warehousepro.service.ShipmentItemService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shipment_items")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ShipmentItemController {
  ShipmentItemService service;
  ShipmentItemMapper mapper;

  @PostMapping
  public ResponseEntity<ShipmentItemResponse> create(@RequestBody CreateShipmentItemRequest request){
    return ResponseEntity.ok(mapper.toShipmentItemResponse(service.create(request)));
  }

  @GetMapping
  public ResponseEntity<List<ShipmentItem>> getAll(){
    return ResponseEntity.ok(service.getAll());
  }

}
