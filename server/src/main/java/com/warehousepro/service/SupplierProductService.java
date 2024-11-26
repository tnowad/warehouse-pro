package com.warehousepro.service;

import com.warehousepro.dto.request.supplierproduct.CreateSupplierProductRequest;
import com.warehousepro.entity.SupplierProduct;
import com.warehousepro.mapstruct.SupplierProductMapper;
import com.warehousepro.repository.SupplierProductRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class SupplierProductService {
  SupplierProductRepository repository;
  SupplierProductMapper mapper;

  @Transactional
  public SupplierProduct create(CreateSupplierProductRequest request) {
    SupplierProduct supplierProduct = mapper.toSupplierProduct(request);
    repository.save(supplierProduct);
    return supplierProduct;
  }

  @Transactional
  public void delete(String id) {
    repository.deleteById(id);
  }

  public List<SupplierProduct> getAll() {
    return repository.findAll();
  }
}
