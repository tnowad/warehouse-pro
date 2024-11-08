package com.warehousepro.controller;

import com.warehousepro.dto.request.order.CreateOrderItemRequest;
import com.warehousepro.dto.response.order.OrderItemReponse;
import com.warehousepro.entity.OrderItem;
import com.warehousepro.mapstruct.OrderItemMapper;
import com.warehousepro.service.OrderItemService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order_items")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderItemController {
  OrderItemService service;
  OrderItemMapper mapper;

  @PostMapping
  public ResponseEntity<OrderItemReponse> create(@RequestBody CreateOrderItemRequest request){
    return ResponseEntity.ok(mapper.toOrderItemReponse(service.create(request)));
  }

  @GetMapping
  public ResponseEntity<List<OrderItem>> getAll(){
    return ResponseEntity.ok(service.getAll());
  }
}
