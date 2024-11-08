package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.shipment.CreateShipmentRequest;
import com.warehousepro.dto.response.shipment.ShipmentResponse;
import com.warehousepro.entity.Shipment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ShipmentMapper {
  Shipment toShipment(CreateShipmentRequest request);
  ShipmentResponse toShipmentResponse(Shipment shipment);
}
