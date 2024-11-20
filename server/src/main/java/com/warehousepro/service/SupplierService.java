package com.warehousepro.service;

import com.warehousepro.dto.request.supplier.CreateSupplierRequest;
import com.warehousepro.entity.Supplier;
import com.warehousepro.mapstruct.SupplierMapper;
import com.warehousepro.repository.SupplierRepository;
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
public class SupplierService {
  SupplierRepository supplierRepository;
  SupplierMapper supplierMapper;

  @Transactional
  public Supplier create(CreateSupplierRequest request) {
    Supplier supplier = supplierMapper.toSupplier(request);
    supplierRepository.save(supplier);
    return supplier;
  }

  public List<Supplier> getAll() {
    return supplierRepository.findAll();
  }
}
