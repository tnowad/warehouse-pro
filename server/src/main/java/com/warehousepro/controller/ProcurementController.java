package com.warehousepro.controller;

import com.warehousepro.dto.request.procurement.CreateProcurementRequest;
import com.warehousepro.dto.request.procurement.ListProcurementsRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.procurement.ProcurementResponse;
import com.warehousepro.dto.response.procurement.item.ProcurementItemResponse;
import com.warehousepro.mapstruct.ProcurementMapper;
import com.warehousepro.service.ProcurementService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/procurements")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProcurementController {
  ProcurementService procurementService;
  ProcurementMapper procurementMapper;

  @PostMapping
  public ResponseEntity<ProcurementResponse> create(@RequestBody CreateProcurementRequest request) {
    return ResponseEntity.ok(
        procurementMapper.toProcurementResponse(procurementService.create(request)));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> delete(@PathVariable("id") String id) {
    procurementService.delete(id);
    return ResponseEntity.ok("xóa thành công");
  }

  @GetMapping
  public ResponseEntity<Object> getAll(@ModelAttribute ListProcurementsRequest request) {
    return ResponseEntity.ok(procurementService.getAll(request));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ProcurementResponse> getById(@PathVariable("id") String id) {
    return ResponseEntity.ok((procurementService.getById(id)));
  }

  @GetMapping("/{id}/items")
  public ResponseEntity<ItemResponse<ProcurementItemResponse>> getItems(@PathVariable("id") String id) {
    return ResponseEntity.ok(procurementService.getItems(id));
  }
}
