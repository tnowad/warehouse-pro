package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.order.CreateOrderItemRequest;
import com.warehousepro.dto.response.order.OrderItemResponse;
import com.warehousepro.entity.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderItemMapper {
  OrderItem toOrderItem(CreateOrderItemRequest createOrderItemRequest);

  @Mapping(target = "orderId", source = "order.id")
  @Mapping(target = "productId", source = "product.id")
  @Mapping(target = "warehouseId", source = "warehouse.id")
  OrderItemResponse toOrderItemReponse(OrderItem orderItem);
}
