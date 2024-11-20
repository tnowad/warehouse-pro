package com.warehousepro.service;

import com.warehousepro.dto.request.inventory.CreateInventoryRequest;
import com.warehousepro.entity.Inventory;
import com.warehousepro.entity.Product;
import com.warehousepro.entity.Warehouse;
import com.warehousepro.mapstruct.InventoryMapper;
import com.warehousepro.repository.InventoryRepository;
import com.warehousepro.repository.ProductRepository;
import com.warehousepro.repository.WareHouseRepository;
import com.warehousepro.specification.InventorySpecification;
import jakarta.persistence.EntityNotFoundException;
import java.util.Map;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class InventoryService {
  InventoryRepository inventoryRepository;
  InventoryMapper inventoryMapper;
  InventorySpecification specification;
  ProductRepository productRepository;
  WareHouseRepository wareHouseRepository;

  public Inventory createInventory(CreateInventoryRequest request) {
    Product product = productRepository.findById(request.getProduct().getId());
    Warehouse warehouse =
        wareHouseRepository
            .findById(request.getWarehouse().getId())
            .orElseThrow(() -> new EntityNotFoundException("Warehouse not found"));
    Inventory inventory = inventoryMapper.toInventory(request);
    inventory.setProduct(product);
    inventory.setWarehouse(warehouse);
    inventoryRepository.save(inventory);
    return inventory;
  }

  public Page<Inventory> findByCriteria(Map<String, String> searchCriteria, Pageable pageable) {
    Specification<Inventory> spec = Specification.where(null);

    if (StringUtils.hasLength(searchCriteria.get("status"))) {
      spec = spec.and(specification.containStatus(searchCriteria.get("status")));
    }

    if (StringUtils.hasLength(searchCriteria.get("quantity"))) {
      spec = spec.and(specification.hasQuantity(searchCriteria.get("quantity")));
    }

    if (StringUtils.hasLength(searchCriteria.get("minimumStockLevel"))) {
      spec = spec.and(specification.hasMinimumStockLevel(searchCriteria.get("minimumStockLevel")));
    }

    if (StringUtils.hasLength(searchCriteria.get("lastUpDate"))) {
      spec = spec.and(specification.onUpdatedAt(searchCriteria.get("lastUpDate")));
    }

    if (StringUtils.hasLength(searchCriteria.get("product"))) {
      spec = spec.and(specification.hasProduct(searchCriteria.get("product")));
    }

    return inventoryRepository.findAll(spec, pageable);
  }

  public Page<Inventory> findAllByProductId(String id, Pageable pageable) {
    return inventoryRepository.getListByProductId(id, pageable);
  }
}
