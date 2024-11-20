package com.warehousepro.controller;

import com.warehousepro.dto.request.supplierproduct.CreateSupplierProductRequest;
import com.warehousepro.dto.response.supplierproduct.SupplierProductResponse;
import com.warehousepro.entity.SupplierProduct;
import com.warehousepro.mapstruct.SupplierProductMapper;
import com.warehousepro.service.SupplierProductService;
import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/supplier-products")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SupplierProductController {
  SupplierProductService service;
  SupplierProductMapper mapper;

  @PostMapping
  public ResponseEntity<SupplierProductResponse> create(
      @RequestBody CreateSupplierProductRequest request) {
    return ResponseEntity.ok(mapper.toSupplierProductResponse(service.create(request)));
  }

  @GetMapping
  public ResponseEntity<List<SupplierProduct>> getAll() {
    return ResponseEntity.ok(service.getAll());
  }
}
