package com.warehousepro.controller;

import com.warehousepro.dto.request.product.CreateProductRequest;
import com.warehousepro.dto.response.product.ProductResponse;
import com.warehousepro.entity.Product;
import com.warehousepro.service.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductController {

  ProductService productService;

  @PostMapping()
  public  ProductResponse create(@RequestBody CreateProductRequest request){
    return productService.createProduct(request);
  }

  @GetMapping
  public ResponseEntity<Page<Product>>  findProductByCriteria(@RequestParam Map<String, String> searchCriteria, Pageable pageable){
    return ResponseEntity.ok(productService.findByCriteria(searchCriteria , pageable));
  }
}
