package com.warehousepro.service;

import com.warehousepro.dto.request.shipment.CreateShipmentTrackingRequest;
import com.warehousepro.entity.ShipmentTracking;
import com.warehousepro.mapstruct.ShipmentTrackingMapper;
import com.warehousepro.repository.ShipmentTrackingRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ShipmentTrackingService {
  ShipmentTrackingRepository repository;
  ShipmentTrackingMapper mapper;

  @Transactional
  public ShipmentTracking create(CreateShipmentTrackingRequest request) {
    ShipmentTracking shipmentTracking = mapper.toShipmentTracking(request);
    repository.save(shipmentTracking);
    return shipmentTracking;
  }

  public List<ShipmentTracking> getAll() {
    return repository.findAll();
  }
}
