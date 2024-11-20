package com.warehousepro.service;

import com.warehousepro.dto.request.shipment.CreateShipmentItemRequest;
import com.warehousepro.entity.ShipmentItem;
import com.warehousepro.mapstruct.ShipmentItemMapper;
import com.warehousepro.repository.ShipmentItemRepository;
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
public class ShipmentItemService {
  ShipmentItemRepository repository;
  ShipmentItemMapper mapper;

  @Transactional
  public ShipmentItem create(CreateShipmentItemRequest request) {
    ShipmentItem shipment = mapper.toShipmentItem(request);
    repository.save(shipment);
    return shipment;
  }

  public List<ShipmentItem> getAll() {
    return repository.findAll();
  }
}
