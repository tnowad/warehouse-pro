package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.order.CreateOrderRequest;
import com.warehousepro.dto.response.order.OrderResponse;
import com.warehousepro.entity.Orders;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderMapper {
  Orders toOrder(CreateOrderRequest request);

  OrderResponse toOrderResponse(Orders order);
}
