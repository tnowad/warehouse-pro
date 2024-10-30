package com.warehousepro.service;

import com.warehousepro.dto.request.inventory.InventoryRequest;
import com.warehousepro.dto.response.inventory.InventoryResponse;
import com.warehousepro.entity.Inventory;
import com.warehousepro.entity.Product;
import com.warehousepro.mapstruct.InventoryMapper;
import com.warehousepro.repository.InventoryRepository;
import com.warehousepro.specification.InventorySpecification;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Map;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class InventoryService {
  InventoryRepository inventoryRepository;
  InventoryMapper inventoryMapper;
  InventorySpecification specification;

  @Transactional
  public Inventory createInventory(InventoryRequest request){
    Inventory inventory = inventoryMapper.toInventory(request);
    inventoryRepository.save(inventory);
    return inventory;
  }

  public Page<Inventory> findByCriteria(Map<String, String> searchCriteria, Pageable pageable){
    Specification<Inventory> spec = Specification.where(null);

    if (StringUtils.hasLength(searchCriteria.get("status"))) {
      spec = spec.and(specification.containStatus(searchCriteria.get("status")));
    }

    if(StringUtils.hasLength(searchCriteria.get("quantity"))) {
      spec = spec.and(specification.hasQuantity(searchCriteria.get("quantity")));
    }

    if(StringUtils.hasLength(searchCriteria.get("minimumStockLevel"))){
      spec = spec.and(specification.hasMinimumStockLevel(searchCriteria.get("minimumStockLevel")));
    }

    if(StringUtils.hasLength(searchCriteria.get("lastUpDate"))){
      spec = spec.and(specification.onUpdatedAt(searchCriteria.get("lastUpDate")));
    }

    return inventoryRepository.findAll(spec, pageable);

  }
}
