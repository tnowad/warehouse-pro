package com.warehousepro.service;

import com.warehousepro.dto.request.shipment.CreateShipmentRequest;
import com.warehousepro.entity.Shipment;
import com.warehousepro.mapstruct.ShipmentMapper;
import com.warehousepro.repository.ShipmentRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ShipmentService {
  ShipmentRepository shipmentRepository;
  ShipmentMapper shipmentMapper;

  @Transactional
  public Shipment create(CreateShipmentRequest request){
    Shipment shipment = shipmentMapper.toShipment(request);
    shipmentRepository.save(shipment);
    return shipment;
  }

  public List<Shipment> getAll(){
    return shipmentRepository.findAll();
  }
}
