package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.procurement.CreateProcurementRequest;
import com.warehousepro.dto.response.procurement.ProcurementResponse;
import com.warehousepro.entity.Procurement;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProcurementMapper {

  @Mapping(target = "totalCost", ignore = true)
  Procurement toProcurement(CreateProcurementRequest request);

  @Mapping(target = "supplierId", source = "supplier.id")
  ProcurementResponse toProcurementResponse(Procurement procurement);
}
