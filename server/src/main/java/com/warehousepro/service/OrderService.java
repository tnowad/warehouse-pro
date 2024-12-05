package com.warehousepro.service;

import com.warehousepro.dto.request.order.CreateOrderItemRequest;
import com.warehousepro.dto.request.order.CreateOrderRequest;
import com.warehousepro.dto.request.order.ListOrderRequest;
import com.warehousepro.dto.request.order.UpdateOrderRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.order.OrderItemResponse;
import com.warehousepro.dto.response.order.OrderResponse;
import com.warehousepro.entity.Order;
import com.warehousepro.entity.OrderItem;
import com.warehousepro.enums.OrderStatus;
import com.warehousepro.mapstruct.OrderMapper;
import com.warehousepro.repository.OrderItemRepository;
import com.warehousepro.repository.OrderRepository;
import com.warehousepro.specification.OrderSpecification;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class OrderService {
  OrderRepository orderRepository;
  OrderMapper orderMapper;
  OrderSpecification orderSpecification;
  OrderItemRepository orderItemRepository;
  OrderItemService orderItemService;

  @Transactional
  @PreAuthorize("hasAuthority('PERMISSION_ORDER_CREATE')")
  public OrderResponse create(CreateOrderRequest request) {
    if (request.getItems() == null || request.getItems().isEmpty()) {
      throw new IllegalArgumentException("orderItem must not be empty");
    }
    final Order order = orderRepository.save(orderMapper.toOrder(request));

    var orderItems =
        request.getItems().stream()
            .map(
                item ->
                    orderItemService.create(
                        order,
                        new CreateOrderItemRequest(
                            item.getProductId(),
                            item.getWarehouseId(),
                            item.getQuantity(),
                            item.getPrice(),
                            item.getDiscount(),
                            item.getStatus())))
            .toList();

    order.setTotalAmount(orderItems.stream().mapToDouble(OrderItem::getTotalPrice).sum());

    orderRepository.save(order);

    return orderMapper.toOrderResponse(order);
  }

  @Transactional
  public OrderResponse cancel(String id) {
    Order order =
        orderRepository
            .findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy order"));
    if (!order.getStatus().equals(OrderStatus.CANCELLED)) order.setStatus(OrderStatus.CANCELLED);
    else throw new RuntimeException("Đơn hàng đã được giao");

    return orderMapper.toOrderResponse(order);
  }

  @PreAuthorize("hasAuthority('PERMISSION_ORDER_LIST')")
  public ItemResponse<OrderResponse> getAll(ListOrderRequest filterRequest) {
    var spec = orderSpecification.getFilterSpecification(filterRequest);
    var pageRequest = PageRequest.of(filterRequest.getPage() - 1, filterRequest.getPageSize());
    var totalItems = orderRepository.count(spec);
    var roles = orderRepository.findAll(spec, pageRequest);
    var page = filterRequest.getPage();
    var pageCount = (int) Math.ceil((double) totalItems / filterRequest.getPageSize());

    return ItemResponse.<OrderResponse>builder()
        .items(roles.stream().map(orderMapper::toOrderResponse).collect(Collectors.toList()))
        .rowCount(Integer.valueOf(totalItems + ""))
        .page(page)
        .pageCount(pageCount)
        .build();
  }

  public List<Order> getAllListOrder() {
    return orderRepository.findAll();
  }

  @PreAuthorize("hasAuthority('PERMISSION_ORDER_SEARCH')")
  public OrderResponse getById(String id) {
    Order order =
        orderRepository
            .findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy order"));
    return orderMapper.toOrderResponse(order);
  }

  @Transactional
  @PreAuthorize("hasAuthority('PERMISSION_ORDER_UPDATE')")
  public OrderResponse update(String id, UpdateOrderRequest request) {
    Order order =
        orderRepository
            .findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy order"));
    if (request.getStatus() != null) order.setStatus(request.getStatus());
    if (request.getShippingAddress() != null)
      order.setShippingAddress(request.getShippingAddress());
    if (request.getPaymentStatus() != null) order.setPaymentStatus(request.getPaymentStatus());

    request.getItems().stream()
        .forEach(
            item -> {
              switch (item.getType()) {
                case CREATE:
                  orderItemService.create(
                      order,
                      new CreateOrderItemRequest(
                          item.getProductId(),
                          item.getWarehouseId(),
                          item.getQuantity(),
                          item.getPrice(),
                          item.getDiscount(),
                          item.getStatus()));
                  break;
                case UPDATE:
                  orderItemService.update(item);
                  break;
                case DELETE:
                  orderItemService.delete(item.getId());
                  break;
                default:
                  break;
              }
            });

    order.setTotalAmount(
        orderItemRepository.findAllByOrderId(id).stream()
            .mapToDouble(OrderItem::getTotalPrice)
            .sum());

    orderRepository.save(order);
    return orderMapper.toOrderResponse(order);
  }

  public List<OrderResponse> exportExcel() {
    return orderRepository.findAll(Sort.by("createdAt")).stream()
        .map(orderMapper::toOrderResponse)
        .collect(Collectors.toList());
  }

  @Transactional
  @PreAuthorize("hasAuthority('PERMISSION_ORDER_DELETE')")
  public void delete(String id) {
    orderRepository.deleteById(id);
  }

  public ItemResponse<OrderItemResponse> getOrderItems(String id) {
    Order order =
        orderRepository
            .findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy order"));

    var items =
        orderItemRepository.findAllByOrderId(id).stream()
            .map(
                item ->
                    OrderItemResponse.builder()
                        .id(item.getId())
                        .orderId(item.getOrder().getId())
                        .productId(item.getProduct().getId())
                        .warehouseId(item.getWarehouse().getId())
                        .quantity(item.getQuantity())
                        .price(item.getPrice())
                        .totalPrice(item.getTotalPrice())
                        .discount(item.getDiscount())
                        .status(item.getStatus())
                        .build())
            .toList();

    return ItemResponse.<OrderItemResponse>builder()
        .items(items)
        .rowCount(items.size())
        .pageCount(items.size())
        .page(1)
        .pageCount(1)
        .build();
  }
}
