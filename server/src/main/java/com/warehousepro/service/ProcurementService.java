package com.warehousepro.service;

import com.warehousepro.dto.request.procurement.CreateProcurementRequest;
import com.warehousepro.dto.request.procurement.ListProcurementsRequest;
import com.warehousepro.dto.request.procurement.item.CreateProcurementItemRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.procurement.ProcurementResponse;
import com.warehousepro.dto.response.procurement.item.ProcurementItemResponse;
import com.warehousepro.entity.Procurement;
import com.warehousepro.entity.ProcurementItem;
import com.warehousepro.mapstruct.ProcurementItemMapper;
import com.warehousepro.mapstruct.ProcurementMapper;
import com.warehousepro.repository.ProcurementRepository;
import com.warehousepro.specification.ProcurementSpecification;
import jakarta.transaction.Transactional;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ProcurementService {
  ProcurementRepository procurementRepository;
  ProcurementMapper procurementMapper;
  ProcurementItemService procurementItemService;
  ProcurementSpecification procurementSpecification;
  ProcurementItemMapper procurementItemMapper;

  @Transactional
  public Procurement create(CreateProcurementRequest request) {
    log.info("Creating procurement with supplierId: {}", request.getSupplierId());

    if (request.getItems() == null || request.getItems().isEmpty()) {
      log.error("Procurement creation failed: procurement items are empty");
      throw new IllegalArgumentException("procurementItem must not be empty");
    }
    Procurement procurement = Procurement.builder().orderDate(request.getOrderDate())
        .deliveryDate(request.getDeliveryDate())
        .status(request.getStatus())
        .build();

    log.debug("Saving procurement entity");
    procurementRepository.save(procurement);

    log.debug("Creating procurement items");
    var procurementItems = request.getItems().stream()
        .map(
            itemRequest -> procurementItemService.create(
                request.getSupplierId(),
                procurement,
                new CreateProcurementItemRequest(
                    itemRequest.getQuantity(),
                    itemRequest.getPrice(),
                    itemRequest.getWarehouseId(),
                    itemRequest.getProductId())))
        .collect(Collectors.toSet());

    double totalCost = 0;

    for (ProcurementItem procurementItem : procurementItems) {
      totalCost += procurementItem.getPrice() * procurementItem.getQuantity();
    }

    procurement.setProcurementItems(procurementItems);
    procurement.setTotalCost(totalCost);

    log.info("Procurement created successfully with ID: {} and total cost: {}", procurement.getId(), totalCost);
    return procurement;
  }

  @Transactional
  @PreAuthorize("hasAuthority('PERMISSION_PROCUREMENT_ORDER_DELETE')")
  public void delete(String id) {
    log.info("Deleting procurement with ID: {}", id);
    procurementRepository.deleteById(id);
    log.info("Procurement with ID: {} deleted successfully", id);
  }

  @PreAuthorize("hasAuthority('PERMISSION_INVENTORY_PRODUCT_LIST')")
  public ItemResponse<ProcurementResponse> getAll(ListProcurementsRequest filterRequest) {
    log.info("Fetching procurements with filters: {}", filterRequest);

    var spec = procurementSpecification.getFilterSpecification(filterRequest);
    var pageRequest = PageRequest.of(filterRequest.getPage() - 1, filterRequest.getPageSize());
    log.debug("Applying pagination with page: {} and pageSize: {}", filterRequest.getPage(),
        filterRequest.getPageSize());

    var totalItems = procurementRepository.count(spec);
    log.debug("Total procurements found: {}", totalItems);

    var items = procurementRepository.findAll(spec, pageRequest).stream()
        .map(procurementMapper::toProcurementResponse)
        .collect(Collectors.toList());

    var page = filterRequest.getPage();
    var pageCount = (int) Math.ceil((double) totalItems / filterRequest.getPageSize());

    log.info("Returning procurement list with page: {} of {} and total items: {}", page, pageCount, totalItems);

    return ItemResponse.<ProcurementResponse>builder()
        .items(items)
        .page(page)
        .pageCount(pageCount)
        .rowCount(totalItems)
        .build();
  }

  public ProcurementResponse getById(String id) {
    log.info("Fetching procurement with ID: {}", id);
    var procurement = procurementRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Procurement not found with ID: " + id));
    log.info("Procurement found with ID: {}", id);
    return procurementMapper.toProcurementResponse(procurement);
  }

  public ItemResponse<ProcurementItemResponse> getItems(String id) {
    log.info("Fetching procurement items with procurement ID: {}", id);
    Procurement procurement = procurementRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Procurement not found with ID: " + id));
    log.info("Procurement found with ID: {}", id);
    log.debug("{} procurement items found", procurement.getProcurementItems().size());
    var items = procurement.getProcurementItems().stream()
        .map(procurementItemMapper::toProcurementItemResponse)
        .collect(Collectors.toList());

    return ItemResponse.<ProcurementItemResponse>builder().items(items).build();
  }

}
