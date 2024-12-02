package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.procurement.CreateProcurementRequest;
import com.warehousepro.dto.response.procurement.ProcurementReponse;
import com.warehousepro.entity.Procurement;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProcurementMapper {

  @Mapping(target = "totalCost", ignore = true)
  Procurement toProcurement(CreateProcurementRequest request);

  ProcurementReponse toProcurementReponse(Procurement procurement);
}
