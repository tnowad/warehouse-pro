package com.warehousepro.controller;

import com.warehousepro.dto.request.product.CreateProductRequest;
import com.warehousepro.dto.response.product.ProductResponse;
import com.warehousepro.entity.Product;
import com.warehousepro.mapstruct.InventoryMapper;
import com.warehousepro.mapstruct.ProductMapper;
import com.warehousepro.service.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductController {

  ProductService productService;
  ProductMapper productMapper;
  InventoryMapper inventoryMapper;

  @PostMapping
  public  ResponseEntity<ProductResponse> create(@RequestBody CreateProductRequest request){
    ProductResponse productResponse = productMapper.toProductResponse(productService.createProduct(request));

    return ResponseEntity.ok(productResponse);
  }


  @GetMapping
  public ResponseEntity<Page<ProductResponse>>  findProductByCriteria(@RequestParam Map<String, String> searchCriteria, Pageable pageable){
    Page<Product> inventoryPage = productService.findByCriteria(searchCriteria,pageable);
    Page<ProductResponse> result = inventoryPage.map(productMapper::toProductResponse);
    return ResponseEntity.ok(result);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> delete(@PathVariable("id") String id){
    productService.delete(id);
    return ResponseEntity.ok("Xóa thành công");
  }
}
