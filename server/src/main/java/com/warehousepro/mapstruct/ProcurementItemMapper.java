package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.procurement.item.CreateProcurementItemRequest;
import com.warehousepro.dto.response.procurement.item.ProcurementItemResponse;
import com.warehousepro.entity.ProcurementItem;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProcurementItemMapper {
  ProcurementItem toProcurementItem(CreateProcurementItemRequest request);
  ProcurementItemResponse toProcurementItemResponse(ProcurementItem procurementItem);
}
