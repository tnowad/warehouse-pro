package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.supplierproduct.CreateSupplierProductRequest;
import com.warehousepro.dto.response.supplierproduct.SupplierProductResponse;
import com.warehousepro.entity.SupplierProduct;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SupplierProductMapper {
  SupplierProduct toSupplierProduct(CreateSupplierProductRequest request);

  @Mapping(target = "productId", source = "product.id")
  @Mapping(target = "supplierId", source = "supplier.id")
  SupplierProductResponse toSupplierProductResponse(SupplierProduct supplierProduct);
}
