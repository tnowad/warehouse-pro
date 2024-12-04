package com.warehousepro.service;

import com.warehousepro.dto.request.shipment.CreateShipmentRequest;
import com.warehousepro.dto.request.shipment.ListShipmentRequest;
import com.warehousepro.dto.request.shipment.UpdateShipmentRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.shipment.ShipmentResponse;
import com.warehousepro.entity.Order;
import com.warehousepro.entity.Shipment;
import com.warehousepro.entity.ShipmentStatus;
import com.warehousepro.mapstruct.ShipmentMapper;
import com.warehousepro.repository.OrderRepository;
import com.warehousepro.repository.ShipmentRepository;
import com.warehousepro.specification.ShippmentSpecification;
import jakarta.transaction.Transactional;
import java.util.stream.Collectors;
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
public class ShipmentService {
  ShipmentRepository shipmentRepository;
  ShipmentMapper shipmentMapper;
  ShippmentSpecification specification;
  OrderRepository orderRepository;

  @Transactional
  public Shipment create(CreateShipmentRequest request) {
    Shipment shipment = shipmentMapper.toShipment(request);
    Order order = orderRepository.findById(request.getOrderId()).orElseThrow(
      () -> new RuntimeException("Không tìm thấy order"));
    shipment.setOrder(order);
    shipmentRepository.save(shipment);
    return shipment;
  }

  public ShipmentResponse getById(String id){
    return shipmentMapper.toShipmentResponse(shipmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy id")));
  }

  public ItemResponse<ShipmentResponse> getAll(ListShipmentRequest filterRequest) {
    var spec = specification.getFilterSpecification(filterRequest);
    var pageRequest = PageRequest.of(filterRequest.getPage() - 1, filterRequest.getPageSize());
    var totalItems = shipmentRepository.count(spec);
    var shipments = shipmentRepository.findAll(spec, pageRequest);
    var page = filterRequest.getPage();
    var pageCount = (int) Math.ceil((double) totalItems / filterRequest.getPageSize());

    return ItemResponse.<ShipmentResponse>builder()
        .items(
            shipments.stream().map(shipmentMapper::toShipmentResponse).collect(Collectors.toList()))
        .rowCount(Integer.valueOf(totalItems + ""))
        .page(page)
        .pageCount(pageCount)
        .build();
  }

  @Transactional
  public ShipmentResponse update(String id , UpdateShipmentRequest request){
      Shipment shipment = shipmentRepository.findById(id).orElseThrow(
        () -> new RuntimeException("Không tồn tại id này trong shipment"));

    if (request.getShipmentDate() != null) {
      shipment.setShipmentDate(request.getShipmentDate());
    }

    if (request.getStatus() != null) {
      try {
        shipment.setStatus(ShipmentStatus.valueOf(request.getStatus().toUpperCase()));
      } catch (IllegalArgumentException e) {
        throw new IllegalArgumentException("Invalid status value: " + request.getStatus());
      }
    }

    if (request.getTrackingNumber() != null) {
      shipment.setTrackingNumber(request.getTrackingNumber());
    }

    if (request.getShippingMethod() != null) {
      shipment.setShippingMethod(request.getShippingMethod());
    }

    if (request.getDeliveryEstimate() != null) {
      shipment.setDeliveryEstimate(request.getDeliveryEstimate());
    }

    if (request.getCarrier() != null) {
      shipment.setCarrier(request.getCarrier());
    }

    shipment = shipmentRepository.save(shipment);
    return shipmentMapper.toShipmentResponse(shipment);
  }

  @Transactional
  public void delete(String id) {
    shipmentRepository.deleteById(id);
  }
}
