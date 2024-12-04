package com.warehousepro.controller;

import com.warehousepro.dto.request.order.ListOrderItemRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.order.OrderItemResponse;
import com.warehousepro.entity.OrderItem;
import com.warehousepro.mapstruct.OrderItemMapper;
import com.warehousepro.service.OrderItemService;
import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order-items")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderItemController {
  OrderItemService service;
  OrderItemMapper mapper;

  @GetMapping
  public ResponseEntity<ItemResponse<OrderItemResponse>> getAll(@ModelAttribute ListOrderItemRequest request) {
    return ResponseEntity.ok(service.getAll(request));
  }

  @GetMapping("/view-order-item/{id}")
  public ResponseEntity<OrderItemResponse> getById(@PathVariable String id) {
    return ResponseEntity.ok(service.getById(id));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> delete(@PathVariable("id") String id) {
    service.delete(id);
    return ResponseEntity.ok("xóa thành công");
  }

}
