package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.supplierproduct.CreateSupplierProductRequest;
import com.warehousepro.dto.response.supplierproduct.SupplierProductResponse;
import com.warehousepro.entity.SupplierProduct;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SupplierProductMapper{
  SupplierProduct toSupplierProduct(CreateSupplierProductRequest request);
  SupplierProductResponse toSupplierProductResponse(SupplierProduct supplierProduct);
}
