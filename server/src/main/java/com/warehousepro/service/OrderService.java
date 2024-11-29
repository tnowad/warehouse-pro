package com.warehousepro.service;

import com.warehousepro.dto.request.order.CreateOrderItemRequest;
import com.warehousepro.dto.request.order.CreateOrderRequest;
import com.warehousepro.dto.request.order.ListOrderRequest;
import com.warehousepro.dto.request.order.UpdateOrderRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.order.OrderItemReponse;
import com.warehousepro.dto.response.order.OrderResponse;
import com.warehousepro.entity.Order;
import com.warehousepro.entity.OrderItem;
import com.warehousepro.enums.OrderStatus;
import com.warehousepro.mapstruct.OrderItemMapper;
import com.warehousepro.mapstruct.OrderMapper;
import com.warehousepro.repository.OrderItemRepository;
import com.warehousepro.repository.OrderRepository;
import com.warehousepro.specification.OrderSpecification;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class OrderService {
  private final OrderItemMapper orderItemMapper;
  OrderRepository orderRepository;
  OrderMapper orderMapper;
  OrderSpecification orderSpecification;
  OrderItemRepository orderItemRepository;
  OrderItemService orderItemService;

  @Transactional
  public OrderResponse create(CreateOrderRequest request) {
    if (request.getItems() == null || request.getItems().isEmpty()) {
      throw new IllegalArgumentException("orderItem must not be empty");
    }
    Order order = orderMapper.toOrder(request);

    double price = 0;
    int quantity = 0;
    double discount = 0;
    double total;

    order = orderRepository.save(order);

    for(CreateOrderItemRequest item : request.getItems()){
      orderItemService.create(item , order);
      price += item.getPrice();
      quantity +=  item.getQuantity();
      discount += item.getDiscount();
    }

    // set order total
    total = price * quantity - discount;
    order.setTotalAmount(total);

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

  public List<Order> getAllListOrder(){
    return orderRepository.findAll();
  }

  public OrderResponse getById(String id) {
    Order order =
        orderRepository
            .findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy order"));
    return orderMapper.toOrderResponse(order);
  }

  @Transactional
  public OrderResponse update(String id, UpdateOrderRequest request) {
    Order order =
        orderRepository
            .findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy order"));
    if (request.getStatus() != null) order.setStatus(request.getStatus());
    if (request.getShippingAddress() != null)
      order.setShippingAddress(request.getShippingAddress());
    if (request.getPaymentStatus() != null) order.setPaymentStatus(request.getPaymentStatus());

    orderRepository.save(order);
    return orderMapper.toOrderResponse(order);
  }

  public List<OrderResponse> exportExcel(){
    return orderRepository.findAll(Sort.by("createdAt")).stream().map(orderMapper::toOrderResponse).collect(Collectors.toList());
  }


  @Transactional
  public void delete(String id) {
    orderRepository.deleteById(id);
  }

  public ItemResponse<OrderItemReponse> getOrderItems(String id) {
    Order order =
        orderRepository
            .findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy order"));

    var items =
        orderItemRepository.findAllByOrderId(id).stream()
            .map(
                item ->
                    OrderItemReponse.builder()
                        .id(item.getId())
                        .orderId(item.getOrder().getId())
                        .productId(item.getProduct().getId())
                        .warehouseId(item.getWarehouse().getId())
                        .quantity(item.getQuantity())
                        .price(item.getPrice())
                        .totalPrice(item.getTotalPrice())
                        .discount(item.getDiscount())
                        .build())
            .toList();

    return ItemResponse.<OrderItemReponse>builder()
        .items(items)
        .rowCount(items.size())
        .pageCount(items.size())
        .page(1)
        .pageCount(1)
        .build();
  }
}
