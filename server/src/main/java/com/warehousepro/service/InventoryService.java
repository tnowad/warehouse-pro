package com.warehousepro.service;

import com.warehousepro.dto.request.inventory.CreateInventoryRequest;
import com.warehousepro.dto.request.inventory.ListInventoryRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.inventory.InventoryResponse;
import com.warehousepro.dto.response.order.OrderResponse;
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
import java.util.stream.Collectors;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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

  public ItemResponse<InventoryResponse> getInventorys(ListInventoryRequest filterRequest) {
    var spec = specification.getFilterSpecification(filterRequest);
    var pageRequest = PageRequest.of(filterRequest.getPage() - 1, filterRequest.getPageSize());
    var totalItems = inventoryRepository.count(spec);
    var inventories = inventoryRepository.findAll(spec, pageRequest);
    var page = filterRequest.getPage();
    var pageCount = (int) Math.ceil((double) totalItems / filterRequest.getPageSize());

    return ItemResponse.<InventoryResponse>builder()
      .items(
        inventories.stream().map(inventoryMapper::toInventoryResponse)
          .collect(Collectors.toList()))
      .rowCount(Integer.valueOf(totalItems + ""))
      .page(page)
      .pageCount(pageCount)
      .build();
  }
}
