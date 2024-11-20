package com.warehousepro.controller;

import com.warehousepro.dto.request.procurement.CreateProcurementRequest;
import com.warehousepro.dto.response.procurement.ProcurementReponse;
import com.warehousepro.mapstruct.ProcurementMapper;
import com.warehousepro.service.ProcurementService;
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
@RequestMapping("/procurements")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProcurementController {
  ProcurementService procurementService;
  ProcurementMapper procurementMapper;

  @PostMapping
  public ResponseEntity<ProcurementReponse> create(@RequestBody CreateProcurementRequest request) {
    return ResponseEntity.ok(
        procurementMapper.toProcurementReponse(procurementService.create(request)));
  }
}
