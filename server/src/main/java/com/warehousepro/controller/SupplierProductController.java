package com.warehousepro.controller;

import com.warehousepro.dto.request.supplierproduct.CreateSupplierProductRequest;
import com.warehousepro.dto.request.supplierproduct.ListSupplierProductRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.returns.ReturnResponse;
import com.warehousepro.dto.response.supplierproduct.SupplierProductResponse;
import com.warehousepro.dto.response.supplierproduct.UpdateSupplierProduct;
import com.warehousepro.mapstruct.SupplierProductMapper;
import com.warehousepro.service.SupplierProductService;
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
  public ResponseEntity<ItemResponse<SupplierProductResponse>> listSupplierProducts(
      @ModelAttribute ListSupplierProductRequest request) {
    return ResponseEntity.ok(service.listSupplierProducts(request));
  }

  @PutMapping("/{id}")
  public ResponseEntity<SupplierProductResponse> update(@PathVariable String id , @RequestBody UpdateSupplierProduct request){
    return ResponseEntity.ok(service.update(id, request));
  }

  @GetMapping("/{id}")
  public ResponseEntity<SupplierProductResponse> getById(@PathVariable String id){
    return  ResponseEntity.ok(service.getById(id));
  }


  @DeleteMapping("/{id}")
  public ResponseEntity<String> delete(@PathVariable("id") String id) {
    service.delete(id);
    return ResponseEntity.ok("xóa thành công");
  }
}
