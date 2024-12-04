package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.shipment.CreateShipmentTrackingRequest;
import com.warehousepro.dto.response.shipment.ShipmentTrackingResponse;
import com.warehousepro.entity.ShipmentTracking;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ShipmentTrackingMapper {

  @Mapping(target = "shipment" , ignore = true)
  ShipmentTracking toShipmentTracking(CreateShipmentTrackingRequest request);

  ShipmentTrackingResponse toShipmentTrackingResponse(ShipmentTracking shipmentTracking);
}
