package com.warehousepro.service;

import com.warehousepro.dto.request.supplierproduct.CreateSupplierProductRequest;
import com.warehousepro.dto.request.supplierproduct.ListSupplierProductRequest;
import com.warehousepro.dto.request.supplierproduct.ListSupplierProductRequest.ListSupplierProductRequestBuilder;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.supplierproduct.SupplierProductResponse;
import com.warehousepro.entity.SupplierProduct;
import com.warehousepro.mapstruct.SupplierProductMapper;
import com.warehousepro.repository.SupplierProductRepository;
import com.warehousepro.specification.SupplierProductSpecification;

import jakarta.transaction.Transactional;
import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class SupplierProductService {
  SupplierProductRepository repository;
  SupplierProductMapper mapper;
  SupplierProductSpecification supplierProductSpecification;

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

  public ItemResponse<SupplierProductResponse> listSupplierProducts(ListSupplierProductRequest request) {
    var spec = supplierProductSpecification.getFilterSpecification(request);
    var pageRequest = PageRequest.of(request.getPage() - 1, request.getPageSize());
    var totalItems = repository.count(spec);
    var supplierProducts = repository.findAll(spec, pageRequest);
    var page = request.getPage();
    var pageCount = (int) Math.ceil((double) totalItems / request.getPageSize());

    return ItemResponse.<SupplierProductResponse>builder()
        .items(
            supplierProducts.stream().map(mapper::toSupplierProductResponse).toList())
        .rowCount(Integer.valueOf(totalItems + ""))
        .page(page)
        .pageCount(pageCount)
        .build();
  }
}
