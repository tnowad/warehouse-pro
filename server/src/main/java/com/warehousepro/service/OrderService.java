package com.warehousepro.service;

import com.warehousepro.dto.request.order.CreateOrderRequest;
import com.warehousepro.dto.request.order.UpdateOrderRequest;
import com.warehousepro.dto.response.order.OrderItemReponse;
import com.warehousepro.dto.response.order.OrderResponse;
import com.warehousepro.entity.Order;
import com.warehousepro.enums.OrderStatus;
import com.warehousepro.mapstruct.OrderMapper;
import com.warehousepro.repository.OrderRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class OrderService {
  OrderRepository orderRepository;
  OrderMapper orderMapper;

  @Transactional
  public Order create(CreateOrderRequest request){
    Order order = orderMapper.toOrder(request);
    orderRepository.save(order);
    return order;
  }

  @Transactional
  public OrderResponse cancel(String id) {
    Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy order"));
    if(!order.getStatus().equals(OrderStatus.CANCELLED.name())) order.setStatus(OrderStatus.CANCELLED.name());
    else throw new RuntimeException("Đơn hàng đã được giao");

    return orderMapper.toOrderResponse(order);
  }

  public List<OrderResponse> getAll(){
    return orderRepository.findAll().stream().map(orderMapper::toOrderResponse).collect(Collectors.toList());
  }

  public OrderResponse getById(String id){
    Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy order"));
    return orderMapper.toOrderResponse(order);
  }

  @Transactional
  public OrderResponse update(String id, UpdateOrderRequest request){
    Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy order"));
    if(request.getStatus() != null) order.setStatus(request.getStatus());
    if (request.getShippingAddress() != null) order.setShippingAddress(request.getShippingAddress());
    if (request.getPaymentStatus() != null) order.setPaymentStatus(request.getPaymentStatus());

    orderRepository.save(order);
    return orderMapper.toOrderResponse(order);
  }


}
