package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.shipment.CreateShipmentTrackingRequest;
import com.warehousepro.dto.response.shipment.ShipmentTrackingResponse;
import com.warehousepro.entity.ShipmentTracking;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ShipmentTrackingMapper {
  ShipmentTracking toShipmentTracking(CreateShipmentTrackingRequest request);
  ShipmentTrackingResponse toShipmentTrackingResponse(ShipmentTracking shipmentTracking);
}
