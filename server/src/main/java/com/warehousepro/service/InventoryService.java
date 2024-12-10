package com.warehousepro.service;

import com.warehousepro.dto.request.inventory.CreateInventoryRequest;
import com.warehousepro.dto.request.inventory.ListInventoryRequest;
import com.warehousepro.dto.request.inventory.UpdateInventoryRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.inventory.InventoryResponse;
import com.warehousepro.entity.Inventory;
import com.warehousepro.entity.InventoryStatus;
import com.warehousepro.entity.Product;
import com.warehousepro.entity.Warehouse;
import com.warehousepro.mapstruct.InventoryMapper;
import com.warehousepro.repository.InventoryRepository;
import com.warehousepro.repository.ProductRepository;
import com.warehousepro.repository.WareHouseRepository;
import com.warehousepro.specification.InventorySpecification;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
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

  @PreAuthorize("hasAuthority('PERMISSION_INVENTORY_PRODUCT_CREATE')")
  public Inventory createInventory(CreateInventoryRequest request) {
    Product product = productRepository.findById(
        (request.getProductId())).orElseThrow(() -> new RuntimeException("Product not found"));
    Warehouse warehouse = wareHouseRepository
        .findById(request.getWarehouseId())
        .orElseThrow(() -> new EntityNotFoundException("Warehouse not found"));

    inventoryRepository
        .findByProductIdAndWarehouseId(product.getId(), warehouse.getId())
        .ifPresent(
            inventory -> {
              throw new IllegalArgumentException("Inventory already exists for the product and warehouse combination");
            });

    Inventory inventory = inventoryMapper.toInventory(request);
    inventory.setProduct(product);
    inventory.setWarehouse(warehouse);
    inventoryRepository.save(inventory);
    return inventory;
  }

  @PreAuthorize("hasAuthority('PERMISSION_INVENTORY_PRODUCT_DELETE')")
  @Transactional
  public void deleteInventory(String id) {
    inventoryRepository.deleteById(id);
  }

  @Transactional
  @PreAuthorize("hasAuthority('PERMISSION_INVENTORY_PRODUCT_UPDATE')")
  public InventoryResponse update(String id, UpdateInventoryRequest request) {
    Inventory inventory = inventoryRepository.findById(id).orElseThrow();

    if (request.getQuantity() != null) {
      inventory.setQuantity(request.getQuantity());
    }

    if (request.getMinimumStockLevel() != null) {
      inventory.setMinimumStockLevel(request.getMinimumStockLevel());
    }

    if (StringUtils.hasText(request.getStatus())) {
      try {
        InventoryStatus inventoryStatus = InventoryStatus.valueOf(request.getStatus().toUpperCase());
        inventory.setStatus(inventoryStatus);
      } catch (IllegalArgumentException e) {
        // Handle the case where the status is not valid
        throw new RuntimeException("Invalid status provided.");
      }
    }

    inventory = inventoryRepository.save(inventory);
    return inventoryMapper.toInventoryResponse(inventory);
  }

  public InventoryResponse checkAndUpdateInventory(
      String productId, String warehouseId, int quantity) {
    var inventory = inventoryRepository
        .findByProductIdAndWarehouseId(productId, warehouseId)
        .orElseThrow(() -> new EntityNotFoundException("Inventory not found"));

    if (inventory.getStatus() == InventoryStatus.IN_ACTIVE) {
      throw new IllegalArgumentException("Inventory is inactive");
    }

    if (quantity > 0) {
      if (inventory.getQuantity() < quantity) {
        throw new IllegalArgumentException("Not enough quantity in inventory");
      }
      inventory.setQuantity(inventory.getQuantity() - quantity);
    } else if (quantity < 0) {
      inventory.setQuantity(inventory.getQuantity() + Math.abs(quantity));
    } else {
      throw new IllegalArgumentException("Quantity change cannot be zero");
    }

    inventoryRepository.save(inventory);

    return inventoryMapper.toInventoryResponse(inventory);
  }

  @PreAuthorize("hasAuthority('PERMISSION_INVENTORY_PRODUCT_LIST')")
  public ItemResponse<InventoryResponse> getInventories(ListInventoryRequest filterRequest) {
    var spec = specification.getFilterSpecification(filterRequest);
    var pageRequest = PageRequest.of(filterRequest.getPage() - 1, filterRequest.getPageSize());
    var totalItems = inventoryRepository.count(spec);
    var inventories = inventoryRepository.findAll(spec, pageRequest);
    var page = filterRequest.getPage();
    var pageCount = (int) Math.ceil((double) totalItems / filterRequest.getPageSize());

    return ItemResponse.<InventoryResponse>builder()
        .items(
            inventories.stream()
                .map(
                    inventory -> InventoryResponse.builder()
                        .id(inventory.getId())
                        .createdAt(inventory.getCreatedAt())
                        .updatedAt(inventory.getUpdatedAt())
                        .status(inventory.getStatus())
                        .price(inventory.getPrice())
                        .minimumStockLevel(inventory.getMinimumStockLevel())
                        .quantity(inventory.getQuantity())
                        .warehouseId(inventory.getWarehouse().getId())
                        .productId(inventory.getProduct().getId())
                        .build())
                .collect(Collectors.toList()))
        .rowCount(Integer.valueOf(totalItems + ""))
        .page(page)
        .pageCount(pageCount)
        .build();
  }
}
