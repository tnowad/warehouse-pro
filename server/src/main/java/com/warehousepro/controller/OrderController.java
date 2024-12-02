package com.warehousepro.controller;

import com.warehousepro.dto.request.order.CreateOrderRequest;
import com.warehousepro.dto.request.order.ListOrderRequest;
import com.warehousepro.dto.request.order.UpdateOrderRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.order.OrderItemResponse;
import com.warehousepro.dto.response.order.OrderResponse;
import com.warehousepro.entity.Order;
import com.warehousepro.generator.OrderExcelGenerator;
import com.warehousepro.mapstruct.OrderMapper;
import com.warehousepro.service.OrderService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
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
  public ResponseEntity<OrderResponse> create(@Valid @RequestBody CreateOrderRequest request) {
    return ResponseEntity.ok(orderService.create(request));
  }

  @GetMapping()
  public ResponseEntity<ItemResponse<OrderResponse>> getALl(
      @ModelAttribute ListOrderRequest listOrderRequest) {
    return ResponseEntity.ok(orderService.getAll(listOrderRequest));
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

  @GetMapping("/{id}")
  public ResponseEntity<OrderResponse> getById(@PathVariable("id") String id) {
    return ResponseEntity.ok(orderService.getById(id));
  }

  @PutMapping("/{id}")
  public ResponseEntity<OrderResponse> updateStatus(
      @PathVariable("id") String id, @RequestBody UpdateOrderRequest request) {
    return ResponseEntity.ok(orderService.update(id, request));
  }

  @GetMapping("/{id}/order-items")
  public ResponseEntity<ItemResponse<OrderItemResponse>> getItems(@PathVariable("id") String id) {
    return ResponseEntity.ok(orderService.getOrderItems(id));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> delete(@PathVariable("id") String id) {
    orderService.delete(id);
    return ResponseEntity.ok("Xóa thành công");
  }

  @GetMapping("/export-to-excel")
  public void exportIntoExcelFile(HttpServletResponse response) throws IOException {
    response.setContentType("application/octet-stream");
    DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
    String currentDateTime = dateFormatter.format(new Date());

    String headerKey = "Content-Disposition";
    String headerValue = "attachment; filename=orders" + currentDateTime + ".xlsx";
    response.setHeader(headerKey, headerValue);

    List<Order> listOfOrders = orderService.getAllListOrder();
    OrderExcelGenerator generator = new OrderExcelGenerator(listOfOrders);
    generator.generateExcelFile(response);
  }
}
