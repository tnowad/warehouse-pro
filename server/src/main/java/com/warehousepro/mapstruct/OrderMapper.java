package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.order.CreateOrderRequest;
import com.warehousepro.dto.response.order.OrderResponse;
import com.warehousepro.entity.Order;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderMapper {
  Order toOrder(CreateOrderRequest request);

  OrderResponse toOrderResponse(Order order);
}
