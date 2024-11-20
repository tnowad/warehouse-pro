package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.order.CreateOrderItemRequest;
import com.warehousepro.dto.response.order.OrderItemReponse;
import com.warehousepro.entity.OrderItem;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderItemMapper {
  OrderItem toOrderItem(CreateOrderItemRequest createOrderItemRequest);

  OrderItemReponse toOrderItemReponse(OrderItem orderItem);
}
