package com.warehousepro.service;

import com.warehousepro.dto.request.shipment.CreateShipmentRequest;
import com.warehousepro.dto.request.shipment.ListShipmentRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.auth.UserResponse;
import com.warehousepro.dto.response.shipment.ShipmentResponse;
import com.warehousepro.entity.Shipment;
import com.warehousepro.mapstruct.ShipmentMapper;
import com.warehousepro.repository.ShipmentRepository;
import com.warehousepro.specification.ShippmentSpecification;
import jakarta.transaction.Transactional;
import java.util.List;
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

  @Transactional
  public Shipment create(CreateShipmentRequest request) {
    Shipment shipment = shipmentMapper.toShipment(request);
    shipmentRepository.save(shipment);
    return shipment;
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
        shipments.stream().map(shipmentMapper::toShipmentResponse)
          .collect(Collectors.toList()))
      .rowCount(Integer.valueOf(totalItems + ""))
      .page(page)
      .pageCount(pageCount)
      .build();
  }
}
