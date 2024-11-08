package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.supplier.CreateSupplierRequest;
import com.warehousepro.dto.response.supplier.SupplierResponse;
import com.warehousepro.entity.Supplier;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SupplierMapper {
  Supplier toSupplier(CreateSupplierRequest request);
  SupplierResponse toSupplierResponse(Supplier supplier);
}
