package com.warehousepro.controller;

import com.warehousepro.dto.request.product.CreateProductRequest;
import com.warehousepro.dto.response.product.ProductResponse;
import com.warehousepro.entity.Product;
import com.warehousepro.mapstruct.ProductMapper;
import com.warehousepro.service.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductController {

  ProductService productService;
  ProductMapper productMapper;


  @PostMapping("")
  public  ProductResponse create(@RequestBody CreateProductRequest request){
    return productService.createProduct(request);
  }

//  @GetMapping
//  public List<ProductResponse> getAll(){
//    return productService.findAll();
//  }


  @GetMapping
  public Page<Product> getAll(Pageable pageable){
    return productService.findAll(pageable);

  }



  @PostMapping("/search")
  public Page<Product> findProductByCriteria(@RequestBody Map<String, String> searchCriteria, Pageable pageable){
    return productService.findByCriteria(searchCriteria , pageable);

  }
}