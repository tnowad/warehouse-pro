package com.warehousepro.service;

import com.warehousepro.dto.request.order.CreateOrderRequest;
import com.warehousepro.dto.request.order.ListOrderRequest;
import com.warehousepro.dto.request.order.UpdateOrderRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.order.OrderResponse;
import com.warehousepro.dto.response.role.RoleRespone;
import com.warehousepro.entity.Orders;
import com.warehousepro.enums.OrderStatus;
import com.warehousepro.mapstruct.OrderMapper;
import com.warehousepro.repository.OrdersRepository;
import com.warehousepro.specification.OrderSpecification;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class OrderService {
  OrdersRepository orderRepository;
  OrderMapper orderMapper;
  OrderSpecification orderSpecification;

  @Transactional
  public Orders create(CreateOrderRequest request) {
    Orders order = orderMapper.toOrder(request);
    orderRepository.save(order);
    return order;
  }

  @Transactional
  public OrderResponse cancel(String id) {
    Orders order =
        orderRepository
            .findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy order"));
    if (!order.getStatus().equals(OrderStatus.CANCELLED.name()))
      order.setStatus(OrderStatus.CANCELLED.name());
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
      .items(
        roles.stream().map(orderMapper::toOrderResponse)
          .collect(Collectors.toList()))
      .rowCount(Integer.valueOf(totalItems + ""))
      .page(page)
      .pageCount(pageCount)
      .build();

  }

  public OrderResponse getById(String id) {
    Orders order =
        orderRepository
            .findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy order"));
    return orderMapper.toOrderResponse(order);
  }

  @Transactional
  public OrderResponse update(String id, UpdateOrderRequest request) {
    Orders order =
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
}
