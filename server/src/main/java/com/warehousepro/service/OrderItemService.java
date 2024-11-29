package com.warehousepro.service;

import com.warehousepro.dto.request.order.CreateOrderItemRequest;
import com.warehousepro.dto.response.order.OrderItemReponse;
import com.warehousepro.entity.Order;
import com.warehousepro.entity.OrderItem;
import com.warehousepro.entity.Product;
import com.warehousepro.entity.Warehouse;
import com.warehousepro.mapstruct.OrderItemMapper;
import com.warehousepro.repository.OrderItemRepository;
import com.warehousepro.repository.ProductRepository;
import com.warehousepro.repository.WareHouseRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class OrderItemService {
  OrderItemMapper mapper;
  OrderItemRepository repository;
  ProductRepository productRepository;
  WareHouseRepository wareHouseRepository;

  @Transactional
  public OrderItem create(CreateOrderItemRequest request , Order order) {
    OrderItem orderItem = mapper.toOrderItem(request);

    Product product = productRepository.findById(request.getProductId());
    Warehouse warehouse = wareHouseRepository.findById(request.getWarehouseId()).orElseThrow();

    orderItem.setProduct(product);
    orderItem.setWarehouse(warehouse);
    orderItem.setOrder(order);

    repository.save(orderItem);
    return orderItem;
  }

  public List<OrderItem> getAll() {
    return repository.findAll();
  }

  public OrderItemReponse getById(String id) {
    OrderItem orderItem =
        repository
            .findById(id)
            .orElseThrow(() -> new RuntimeException("order item id không tồn tại"));
    return mapper.toOrderItemReponse(orderItem);
  }

  @Transactional
  public void delete(String id) {
    repository.deleteById(id);
  }
}
