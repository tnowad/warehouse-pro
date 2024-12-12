package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.shipment.CreateShipmentItemRequest;
import com.warehousepro.dto.response.shipment.ShipmentItemResponse;
import com.warehousepro.entity.ShipmentItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ShipmentItemMapper {
  @Mapping(target = "id", ignore = true)
  ShipmentItem toShipmentItem(CreateShipmentItemRequest request);

  @Mapping(source = "orderItem.id", target = "orderItemId")
  @Mapping(source = "shipment.id", target = "shipmentId")
  ShipmentItemResponse toShipmentItemResponse(ShipmentItem shipmentItem);
}
