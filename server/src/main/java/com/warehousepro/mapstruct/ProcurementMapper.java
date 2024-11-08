package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.procurement.CreateProcurementRequest;
import com.warehousepro.dto.response.procurement.ProcurementReponse;
import com.warehousepro.entity.Procurement;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProcurementMapper {
  Procurement toProcurement(CreateProcurementRequest request);
  ProcurementReponse toProcurementReponse(Procurement procurement);
}
