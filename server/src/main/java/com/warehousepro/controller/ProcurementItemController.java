package com.warehousepro.controller;

import com.warehousepro.dto.request.procurement.item.CreateProcurementItemRequest;
import com.warehousepro.dto.response.procurement.item.ProcurementItemResponse;
import com.warehousepro.mapstruct.ProcurementItemMapper;
import com.warehousepro.service.ProcurementItemService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/procurements-item")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProcurementItemController {
  ProcurementItemService service;
  ProcurementItemMapper mapper;

  @PostMapping
  public ResponseEntity<ProcurementItemResponse> create(@RequestBody CreateProcurementItemRequest request){
    return ResponseEntity.ok(mapper.toProcurementItemResponse(service.create(request)));
  }



}