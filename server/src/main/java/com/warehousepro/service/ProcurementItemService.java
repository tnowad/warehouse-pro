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
      Supplier supplier, Procurement procurement, CreateProcurementItemRequest request) {
    ProcurementItem procurementItem = mapper.toProcurementItem(request);

    if (!supplierProductRepository.existsBySupplierIdAndProductId(
        supplier.getId(), request.getProductId())) {
      throw new RuntimeException("The product not in supplier");
    }

    Product product = productRepository.findById(request.getProductId());
    Warehouse warehouse = wareHouseRepository.getById(request.getWarehouseId());

    inventoryService.checkAndUpdateInventory(
        request.getProductId(), request.getWarehouseId(), request.getQuantity());

    procurementItem.setProduct(product);
    procurementItem.setWarehouse(warehouse);
    procurementItem.setProcurement(procurement);
    repository.save(procurementItem);
    return procurementItem;
  }

  @Transactional
  public void delete(String id) {
    repository.deleteById(id);
  }
}
