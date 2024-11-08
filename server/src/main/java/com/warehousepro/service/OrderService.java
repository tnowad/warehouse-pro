package com.warehousepro.service;

import com.warehousepro.dto.request.order.CreateOrderRequest;
import com.warehousepro.entity.Order;
import com.warehousepro.mapstruct.OrderMapper;
import com.warehousepro.repository.OrderRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

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

  public List<Order> getAll(){
    return orderRepository.findAll();
  }
}
