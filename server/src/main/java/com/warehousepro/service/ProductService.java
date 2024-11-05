package com.warehousepro.service;


import com.warehousepro.dto.request.product.CreateProductRequest;
import com.warehousepro.entity.Product;
import com.warehousepro.mapstruct.InventoryMapper;
import com.warehousepro.mapstruct.ProductMapper;
import com.warehousepro.repository.ProductRepository;
import com.warehousepro.specification.ProductSpecification;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Map;


@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ProductService {
  ProductRepository productRepository;
  ProductSpecification specification;
  ProductMapper productMapper;
  InventoryMapper inventoryMapper;

  @Transactional
  public Product createProduct(CreateProductRequest request) {
    Product product = productMapper.toProduct(request);
    productRepository.save(product);
    return product;
  }


  public Page<Product> findByCriteria(Map<String, String> searchCriteria, Pageable pageable) {
    Specification<Product> spec = Specification.where(null);

    if (StringUtils.hasLength(searchCriteria.get("name"))) {
      spec = spec.and(specification.containName(searchCriteria.get("name")));
    }

    if (StringUtils.hasLength(searchCriteria.get("description"))) {
      spec = spec.and(specification.containDesc(searchCriteria.get("description")));
    }

    if (StringUtils.hasLength(searchCriteria.get("sku"))) {
      spec = spec.and(specification.containSku(searchCriteria.get("sku")));
    }

    if (StringUtils.hasLength(searchCriteria.get("price"))) {
      spec = spec.and(specification.hasPrice(searchCriteria.get("price")));
    }

    return productRepository.findAll(spec, pageable);
  }

  @Transactional
  public void delete(String id){
    productRepository.deleteById(id);
  }


}