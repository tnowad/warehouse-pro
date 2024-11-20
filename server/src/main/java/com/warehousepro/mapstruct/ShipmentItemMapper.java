package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.shipment.CreateShipmentItemRequest;
import com.warehousepro.dto.response.shipment.ShipmentItemResponse;
import com.warehousepro.entity.ShipmentItem;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ShipmentItemMapper {
  ShipmentItem toShipmentItem(CreateShipmentItemRequest request);

  ShipmentItemResponse toShipmentItemResponse(ShipmentItem shipmentItem);
}
