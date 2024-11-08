package com.warehousepro.service;

import com.warehousepro.dto.request.procurement.item.CreateProcurementItemRequest;
import com.warehousepro.entity.Procurement;
import com.warehousepro.entity.ProcurementItem;
import com.warehousepro.entity.Product;
import com.warehousepro.entity.Warehouse;
import com.warehousepro.mapstruct.ProcurementItemMapper;
import com.warehousepro.repository.ProcurementItemRepository;
import com.warehousepro.repository.ProcurementRepository;
import com.warehousepro.repository.ProductRepository;
import com.warehousepro.repository.WareHouseRepository;
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

  @Transactional
  public ProcurementItem create(CreateProcurementItemRequest request){
    ProcurementItem procurementItem = mapper.toProcurementItem(request);

    Product product = productRepository.findById(procurementItem.getProduct().getId());
    Warehouse warehouse = wareHouseRepository.getById(procurementItem.getWarehouse().getId());
    Procurement procurement = procurementRepository.getById(procurementItem.getProcurement().getId());
    

    procurementItem.setProduct(product);
    procurementItem.setWarehouse(warehouse);
    procurementItem.setProcurement(procurement);
    repository.save(procurementItem);
    return procurementItem;
  }
}
