package com.warehousepro.controller;

import com.warehousepro.dto.request.order.CreateOrderRequest;
import com.warehousepro.dto.response.order.OrderResponse;
import com.warehousepro.entity.Order;
import com.warehousepro.mapstruct.OrderMapper;
import com.warehousepro.service.OrderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderController {
  OrderService orderService;
  OrderMapper orderMapper;

  @PostMapping
  public ResponseEntity<OrderResponse> create(@RequestBody CreateOrderRequest request){
    return ResponseEntity.ok(orderMapper.toOrderResponse(orderService.create(request)));
  }

  @GetMapping
  public ResponseEntity<List<Order>> getALl(){
    return ResponseEntity.ok(orderService.getAll());
  }


}
