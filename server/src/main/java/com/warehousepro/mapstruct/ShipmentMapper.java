package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.shipment.CreateShipmentRequest;
import com.warehousepro.dto.response.shipment.ShipmentResponse;
import com.warehousepro.entity.Shipment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ShipmentMapper {
  Shipment toShipment(CreateShipmentRequest request);

  @Mapping(target = "orderId", source = "order.id")
  ShipmentResponse toShipmentResponse(Shipment shipment);
}
