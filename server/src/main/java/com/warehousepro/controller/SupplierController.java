package com.warehousepro.controller;

import com.warehousepro.dto.request.supplier.CreateSupplierRequest;
import com.warehousepro.dto.request.supplier.ListSupplierRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.supplier.SupplierResponse;
import com.warehousepro.entity.Supplier;
import com.warehousepro.mapstruct.SupplierMapper;
import com.warehousepro.service.SupplierService;
import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/suppliers")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SupplierController {

  SupplierService supplierService;
  SupplierMapper supplierMapper;

  @PostMapping
  public ResponseEntity<SupplierResponse> create(@RequestBody CreateSupplierRequest request) {
    return ResponseEntity.ok(supplierMapper.toSupplierResponse(supplierService.create(request)));
  }

  @GetMapping
  public ResponseEntity<ItemResponse<SupplierResponse>> getALl(@ModelAttribute ListSupplierRequest listSupplierRequest) {
    return ResponseEntity.ok(supplierService.getAll(listSupplierRequest));
  }
}
