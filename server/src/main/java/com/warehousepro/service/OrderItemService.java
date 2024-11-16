package com.warehousepro.service;

import com.warehousepro.dto.request.order.CreateOrderItemRequest;
import com.warehousepro.dto.response.order.OrderItemReponse;
import com.warehousepro.entity.OrderItem;
import com.warehousepro.mapstruct.OrderItemMapper;
import com.warehousepro.repository.OrderItemRepository;
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
public class OrderItemService {
  OrderItemMapper mapper;
  OrderItemRepository repository;

  @Transactional
  public OrderItem create(CreateOrderItemRequest request){
    OrderItem orderItem = mapper.toOrderItem(request);
    repository.save(orderItem);
    return orderItem;
  }

  public List<OrderItem> getAll(){
    return repository.findAll();
  }

  public OrderItemReponse getById(String id){
    OrderItem orderItem =  repository.findById(id).orElseThrow(() -> new RuntimeException("order item id không tồn tại"));
    return mapper.toOrderItemReponse(orderItem);
  }

}
