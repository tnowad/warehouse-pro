package com.warehousepro.service;

import com.warehousepro.dto.request.supplier.CreateSupplierRequest;
import com.warehousepro.dto.request.supplier.ListSupplierRequest;
import com.warehousepro.dto.request.supplier.UpdateSupplierRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.supplier.SupplierResponse;
import com.warehousepro.entity.Supplier;
import com.warehousepro.mapstruct.SupplierMapper;
import com.warehousepro.repository.SupplierRepository;
import com.warehousepro.specification.SupplierSpecification;
import jakarta.transaction.Transactional;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class SupplierService {
  SupplierRepository supplierRepository;
  SupplierMapper supplierMapper;
  SupplierSpecification supplierSpecification;

  @Transactional
  public Supplier create(CreateSupplierRequest request) {
    Supplier supplier = supplierMapper.toSupplier(request);
    supplierRepository.save(supplier);
    return supplier;
  }

  public ItemResponse<SupplierResponse> getAll(ListSupplierRequest filterRequest) {
    var spec = supplierSpecification.getFilterSpecification(filterRequest);
    var pageRequest = PageRequest.of(filterRequest.getPage() - 1, filterRequest.getPageSize());
    var totalItems = supplierRepository.count(spec);
    var suppliers = supplierRepository.findAll(spec, pageRequest);
    var page = filterRequest.getPage();
    var pageCount = (int) Math.ceil((double) totalItems / filterRequest.getPageSize());

    return ItemResponse.<SupplierResponse>builder()
        .items(
            suppliers.stream().map(supplierMapper::toSupplierResponse).collect(Collectors.toList()))
        .rowCount(Integer.valueOf(totalItems + ""))
        .page(page)
        .pageCount(pageCount)
        .build();
  }

  @Transactional
  public void delete(String id) {
    supplierRepository.deleteById(id);
  }

  public SupplierResponse get(String supplierId) {
    return supplierMapper.toSupplierResponse(supplierRepository.findById(supplierId).get());
  }

  @PreAuthorize("hasAuthority('PERMISSION_PROCUREMENT_SUPPLIER_UPDATE')")
  public SupplierResponse update(String supplierId, UpdateSupplierRequest request) {
    Supplier supplier = supplierRepository.findById(supplierId).get();
    supplier.setName(request.getName());
    supplier.setContact(request.getContact());
    supplier.setAddress(request.getAddress());
    supplierRepository.save(supplier);
    return supplierMapper.toSupplierResponse(supplier);
  }
}
