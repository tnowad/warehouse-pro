package com.warehousepro.controller;

import com.warehousepro.dto.request.order.CreateOrderRequest;
import com.warehousepro.dto.request.order.UpdateOrderRequest;
import com.warehousepro.dto.response.order.OrderResponse;
import com.warehousepro.mapstruct.OrderMapper;
import com.warehousepro.service.OrderService;
import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderController {
  OrderService orderService;
  OrderMapper orderMapper;

  @PostMapping
  public ResponseEntity<OrderResponse> create(@RequestBody CreateOrderRequest request) {
    return ResponseEntity.ok(orderMapper.toOrderResponse(orderService.create(request)));
  }

  @GetMapping
  public ResponseEntity<List<OrderResponse>> getALl() {
    return ResponseEntity.ok(orderService.getAll());
  }

  @PutMapping("/order-cancel/{id}")
  public ResponseEntity<OrderResponse> cancel(@PathVariable("id") String id) {
    return ResponseEntity.ok(orderService.cancel(id));
  }

  @PutMapping("/update-order/{id}")
  public ResponseEntity<OrderResponse> update(
      @PathVariable("id") String id, @RequestBody UpdateOrderRequest request) {
    return ResponseEntity.ok(orderService.update(id, request));
  }

  @GetMapping("/view-order/{id}")
  public ResponseEntity<OrderResponse> getById(@PathVariable("id") String id) {
    return ResponseEntity.ok(orderService.getById(id));
  }
}
