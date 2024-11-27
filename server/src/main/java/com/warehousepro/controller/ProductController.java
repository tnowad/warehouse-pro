package com.warehousepro.controller;

import com.warehousepro.dto.request.product.CreateProductRequest;
import com.warehousepro.dto.request.product.ListProductRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.product.ProductResponse;
import com.warehousepro.mapstruct.InventoryMapper;
import com.warehousepro.mapstruct.ProductMapper;
import com.warehousepro.service.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductController {

  ProductService productService;
  ProductMapper productMapper;
  InventoryMapper inventoryMapper;

  @GetMapping()
  public ResponseEntity<ItemResponse<ProductResponse>> getALl(
      @ModelAttribute ListProductRequest listProductRequest) {
    return ResponseEntity.ok(productService.getAll(listProductRequest));
  }

  @PostMapping
  public ResponseEntity<ProductResponse> create(@RequestBody CreateProductRequest request) {
    ProductResponse productResponse =
        productMapper.toProductResponse(productService.createProduct(request));

    return ResponseEntity.ok(productResponse);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> delete(@PathVariable("id") String id) {
    productService.delete(id);
    return ResponseEntity.ok("Xóa thành công");
  }
}
