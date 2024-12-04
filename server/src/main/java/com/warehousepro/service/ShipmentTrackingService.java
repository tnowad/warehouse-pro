package com.warehousepro.service;

import com.warehousepro.dto.request.shipment.CreateShipmentTrackingRequest;
import com.warehousepro.dto.request.shipment.ListShipmentTracking;
import com.warehousepro.dto.request.shipment.UpdateShipmentTracking;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.shipment.ShipmentTrackingResponse;
import com.warehousepro.entity.Shipment;
import com.warehousepro.entity.ShipmentTracking;
import com.warehousepro.mapstruct.ShipmentTrackingMapper;
import com.warehousepro.repository.ShipmentRepository;
import com.warehousepro.repository.ShipmentTrackingRepository;
import com.warehousepro.repository.UserRepository;
import com.warehousepro.specification.ShipmentTrackingSpecification;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ShipmentTrackingService {
  private final UserRepository userRepository;
  ShipmentTrackingRepository repository;
  ShipmentTrackingMapper mapper;
  ShipmentTrackingSpecification shipmentTrackingSpecification;
  ShipmentRepository shipmentRepository;

  @Transactional
  public ShipmentTracking create(CreateShipmentTrackingRequest request) {
    ShipmentTracking shipmentTracking = mapper.toShipmentTracking(request);
    Shipment shipment = shipmentRepository.findById(request.getShipmentId()).orElseThrow();
    shipmentTracking.setShipment(shipment);
    repository.save(shipmentTracking);
    return shipmentTracking;
  }

  @Transactional
  public void delete(String id) {
    repository.deleteById(id);
  }

  public ShipmentTrackingResponse getById(String id){
    return mapper.toShipmentTrackingResponse(repository.findById(id).orElseThrow());
  }

  public ItemResponse<ShipmentTrackingResponse> getAll(ListShipmentTracking request) {
    var spec = shipmentTrackingSpecification.getFilterSpecification(request);
    var pageRequest = PageRequest.of(request.getPage() - 1, request.getPageSize());
    var totalItems = repository.count(spec);
    var shipmentTrackings = repository.findAll(spec, pageRequest);
    var page = request.getPage();
    var pageCount = (int) Math.ceil((double) totalItems / request.getPageSize());

    return ItemResponse.<ShipmentTrackingResponse>builder()
      .items(shipmentTrackings.stream().map(mapper::toShipmentTrackingResponse).toList())
      .rowCount((int) totalItems)
      .page(page)
      .pageCount(pageCount)
      .build();
  }

  @Transactional
  public ShipmentTrackingResponse update(String id , UpdateShipmentTracking request){
    ShipmentTracking shipmentTracking = repository.findById(id).orElseThrow(
      () -> new RuntimeException("Không tìm thấy id của shipment tracking"));

    if (request.getLocation() != null){
      shipmentTracking.setLocation(request.getLocation());
    }

    if (request.getTrackingEvent() != null) {
      shipmentTracking.setTrackingEvent(request.getTrackingEvent());
    }

    if (request.getEventDate() != null) {
      shipmentTracking.setEventDate(request.getEventDate());
    }

    if (request.getStatus() != null) {
      shipmentTracking.setStatus(request.getStatus());
    }

    shipmentTracking = repository.save(shipmentTracking);
    return mapper.toShipmentTrackingResponse(shipmentTracking);

  }


}
