package com.warehousepro.service;

import com.warehousepro.dto.request.procurement.item.CreateProcurementItemRequest;
import com.warehousepro.entity.*;
import com.warehousepro.mapstruct.ProcurementItemMapper;
import com.warehousepro.repository.*;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ProcurementItemService {
  ProcurementItemRepository repository;
  ProcurementItemMapper mapper;
  ProductRepository productRepository;
  WareHouseRepository wareHouseRepository;
  ProcurementRepository procurementRepository;
  InventoryService inventoryService;
  SupplierProductRepository supplierProductRepository;

  @Transactional
  public ProcurementItem create(
      String supplierId, Procurement procurement, CreateProcurementItemRequest request) {
    log.info("Creating procurement item with productId: {}", request.getProductId());

    if (!supplierProductRepository.existsBySupplierIdAndProductId(
        supplierId, request.getProductId())) {
      log.error("Supplier does not provide productId: {}", request.getProductId());
      throw new RuntimeException("The product not in supplier");
    }

    Product product = productRepository.findById((request.getProductId()))
        .orElseThrow(() -> new RuntimeException("Không tìm thấy product"));
    Warehouse warehouse = wareHouseRepository.getById(request.getWarehouseId());

    log.debug("Checking and updating inventory for productId: {} and warehouseId: {}",
        request.getProductId(), request.getWarehouseId());
    inventoryService.checkAndUpdateInventory(
        request.getProductId(), request.getWarehouseId(), request.getQuantity());

    log.debug("Saving procurement item entity");
    ProcurementItem procurementItem = ProcurementItem.builder()
        .quantity(request.getQuantity())
        .price(request.getPrice())
        .build();

    procurementItem.setProduct(product);
    procurementItem.setWarehouse(warehouse);
    procurementItem.setProcurement(procurement);

    log.debug("Persisting procurement item with quantity: {} and price: {}",
        procurementItem.getQuantity(), procurementItem.getPrice());

    repository.save(procurementItem);

    log.info("Procurement item created successfully with ID: {}", procurementItem.getId());

    return procurementItem;
  }

  @Transactional
  public void delete(String id) {
    repository.deleteById(id);
  }
}
