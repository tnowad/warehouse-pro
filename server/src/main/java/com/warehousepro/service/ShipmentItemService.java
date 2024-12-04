package com.warehousepro.service;

import com.warehousepro.dto.request.shipment.CreateShipmentItemRequest;
import com.warehousepro.dto.request.shipment.ListShipmentItemRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.shipment.ShipmentItemResponse;
import com.warehousepro.entity.ShipmentItem;
import com.warehousepro.mapstruct.ShipmentItemMapper;
import com.warehousepro.repository.ShipmentItemRepository;
import com.warehousepro.specification.ShipmentItemSpecification;
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
public class ShipmentItemService {
  ShipmentItemRepository repository;
  ShipmentItemMapper mapper;
  ShipmentItemSpecification shipmentItemSpecification;

  @Transactional
  public ShipmentItem create(CreateShipmentItemRequest request) {
    ShipmentItem shipment = mapper.toShipmentItem(request);
    repository.save(shipment);
    return shipment;
  }

  @Transactional
  public void delete(String id) {
    repository.deleteById(id);
  }

  public ItemResponse<ShipmentItemResponse> getAll(ListShipmentItemRequest request) {
    var spec = shipmentItemSpecification.getFilterSpecification(request);
    var pageRequest = PageRequest.of(request.getPage() - 1, request.getPageSize());
    var totalItems = repository.count(spec);
    var shipmentItems = repository.findAll(spec, pageRequest);
    var page = request.getPage();
    var pageCount = (int) Math.ceil((double) totalItems / request.getPageSize());

    return ItemResponse.<ShipmentItemResponse>builder()
      .items(shipmentItems.stream().map(mapper::toShipmentItemResponse).toList())
      .rowCount((int) totalItems)
      .page(page)
      .pageCount(pageCount)
      .build();
  }

  public ShipmentItemResponse getById(String id){
    return mapper.toShipmentItemResponse(repository.findById(id).orElseThrow());
  }


}
