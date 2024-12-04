package com.warehousepro.service;

import com.warehousepro.dto.request.procurement.CreateProcurementRequest;
import com.warehousepro.dto.request.procurement.ListProcurementsRequest;
import com.warehousepro.dto.request.procurement.item.CreateProcurementItemRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.procurement.ProcurementResponse;
import com.warehousepro.entity.Procurement;
import com.warehousepro.entity.ProcurementItem;
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

  @Transactional
  public Procurement create(CreateProcurementRequest request) {
    if (request.getProcurementItemRequests() == null
        || request.getProcurementItemRequests().isEmpty()) {
      throw new IllegalArgumentException("procurementItem must not be empty");
    }

    final Procurement procurement =
        procurementRepository.save(procurementMapper.toProcurement(request));

    var procurementItem =
        request.getProcurementItemRequests().stream()
            .map(
                itemRequest ->
                    procurementItemService.create(
                        request.getSupplier(),
                        procurement,
                        new CreateProcurementItemRequest(
                            itemRequest.getQuantity(),
                            itemRequest.getPrice(),
                            itemRequest.getWarehouseId(),
                            itemRequest.getProductId())))
            .collect(Collectors.toSet());

    double totalCost = 0;

    for (ProcurementItem procurementItem1 : procurementItem)
      totalCost += procurementItem1.getPrice() * procurementItem1.getQuantity();

    procurement.setProcurementItems(procurementItem);
    procurement.setTotalCost(totalCost);

    return procurement;
  }

  @Transactional
  public void delete(String id) {
    procurementRepository.deleteById(id);
  }

  public ItemResponse<ProcurementResponse> getAll(ListProcurementsRequest filterRequest) {
    var spec = procurementSpecification.getFilterSpecification(filterRequest);
    var pageRequest = PageRequest.of(filterRequest.getPage() - 1, filterRequest.getPageSize());
    var totalItems = procurementRepository.count(spec);
    var items =
        procurementRepository.findAll(spec, pageRequest).stream()
            .map(procurementMapper::toProcurementResponse)
            .collect(Collectors.toList());
    var page = filterRequest.getPage();
    var pageCount = (int) Math.ceil((double) totalItems / filterRequest.getPageSize());

    return ItemResponse.<ProcurementResponse>builder()
        .items(items)
        .page(page)
        .pageCount(pageCount)
        .rowCount(totalItems)
        .build();
  }
}
