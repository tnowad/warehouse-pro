package com.warehousepro.service;

import com.warehousepro.dto.request.returns.CreateBulkReturnRequest;
import com.warehousepro.dto.request.returns.CreateReturnRequest;
import com.warehousepro.dto.request.returns.ListReturnRequest;
import com.warehousepro.dto.request.returns.UpdateReturnRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.order.OrderItemResponse;
import com.warehousepro.dto.response.returns.ReturnResponse;
import com.warehousepro.entity.Order;
import com.warehousepro.entity.OrderItemStatus;
import com.warehousepro.entity.Return;
import com.warehousepro.entity.ReturnStatus;
import com.warehousepro.generator.OrderExcelUtility;
import com.warehousepro.mapstruct.ReturnMapper;
import com.warehousepro.repository.OrderRepository;
import com.warehousepro.repository.ReturnRepository;
import com.warehousepro.specification.ReturnSpecification;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ReturnService {
  private final ReturnMapper returnMapper;
  ReturnRepository repository;
  ReturnMapper mapper;
  ReturnSpecification specification;
  OrderRepository orderRepository;
  OrderItemService orderItemService;

  @Transactional
  @PreAuthorize("hasAuthority('PERMISSION_RETURN_CREATE')")
  public ReturnResponse create(CreateReturnRequest request) {
    log.info("Creating a return for order item ID: {}", request.getOrderItemId());
    Return returns = mapper.toReturn(request);
    repository.save(returns);
    log.info("Return created successfully with ID: {}", returns.getId());
    return mapper.toReturnResponse(returns);
  }

  @PreAuthorize("hasAuthority('PERMISSION_RETURN_LIST')")
  public ItemResponse<ReturnResponse> getAll(ListReturnRequest filterRequest) {
    log.info("Fetching all returns with filters: {}", filterRequest);
    var spec = specification.getFilterSpecification(filterRequest);
    var pageRequest = PageRequest.of(filterRequest.getPage() - 1, filterRequest.getPageSize());
    var totalItems = repository.count(spec);
    log.debug("Total items matching filters: {}", totalItems);
    var returns = repository.findAll(spec, pageRequest);
    log.info("Fetched {} returns for page {}", returns.getSize(), filterRequest.getPage());
    var pageCount = (int) Math.ceil((double) totalItems / filterRequest.getPageSize());

    return ItemResponse.<ReturnResponse>builder()
        .items(returns.stream().map(returnMapper::toReturnResponse).collect(Collectors.toList()))
        .rowCount((int) totalItems)
        .page(filterRequest.getPage())
        .pageCount(pageCount)
        .build();
  }

  @PreAuthorize("hasAuthority('PERMISSION_RETURN_UPDATE')")
  public ReturnResponse update(String id , UpdateReturnRequest request){
    Return returns = repository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy return id"));

    if (request.getReason() != null){
      returns.setReason(returns.getReason());
    }

    if (request.getReturnDate() != null) {
      returns.setReturnDate(request.getReturnDate());
    }

    if (request.getStatus() != null) {
      try {
        returns.setStatus(ReturnStatus.valueOf(request.getStatus().toUpperCase()));
      } catch (IllegalArgumentException e) {
        throw new IllegalArgumentException("Invalid status value: " + request.getStatus());
      }
    }

    returns = repository.save(returns);
    return mapper.toReturnResponse(returns);
  }

  public ReturnResponse getById(String id){
    return mapper.toReturnResponse(repository.findById(id).orElseThrow(
      () -> new RuntimeException("Không tìm thấy return id")));
  }


  public void save(MultipartFile file) {
    log.info("Saving orders from uploaded file");
    try {
      List<Order> orderList = OrderExcelUtility.excelToOrderList(file.getInputStream());
      log.info("Parsed {} orders from the Excel file", orderList.size());
      orderRepository.saveAll(orderList);
      log.info("Orders saved successfully");
    } catch (IOException ex) {
      log.error("Failed to process Excel file: {}", ex.getMessage());
      throw new RuntimeException("Excel data failed to store: " + ex.getMessage(), ex);
    }
  }

  @Transactional
  @PreAuthorize("hasAuthority('PERMISSION_RETURN_DELETE')")
  public void delete(String id) {
    log.info("Deleting return with ID: {}", id);
    repository.deleteById(id);
    log.info("Return with ID: {} deleted successfully", id);
  }

  @Transactional
  public ItemResponse<ReturnResponse> createBulk(CreateBulkReturnRequest request) {
    log.info("Bulk creating returns for {} order items", request.getOrderItemIds().size());
    var orderItems =
        request.getOrderItemIds().stream()
            .map(
                id -> {
                  log.debug("Fetching order item with ID: {}", id);
                  return orderItemService.getById(id);
                })
            .collect(Collectors.toList());

    if (orderItems.stream().map(OrderItemResponse::getOrderId).distinct().count() > 1) {
      log.error("Validation failed: Order items must be in the same order");
      throw new IllegalArgumentException("Order items must be in the same order");
    }

    if (orderItems.stream().anyMatch(item -> item.getStatus().equals(OrderItemStatus.RETURNED))) {
      log.error("Validation failed: Some order items are already returned");
      throw new IllegalArgumentException("Order items must not be returned");
    }

    log.info("Creating returns for {} order items", orderItems.size());
    var returns =
        orderItems.stream()
            .map(
                item ->
                    CreateReturnRequest.builder()
                        .orderItemId(item.getId())
                        .reason(request.getReason())
                        .status(request.getStatus())
                        .returnDate(request.getReturnDate())
                        .build())
            .map(this::create)
            .collect(Collectors.toList());

    orderItems.forEach(
        item -> {
          log.debug("Updating order item status to RETURNED for ID: {}", item.getId());
          orderItemService.updateStatus(item.getId(), OrderItemStatus.RETURNED);
        });

    log.info("Successfully created {} returns", returns.size());
    return ItemResponse.<ReturnResponse>builder()
        .items(returns)
        .rowCount(returns.size())
        .page(1)
        .pageCount(1)
        .build();
  }
}
