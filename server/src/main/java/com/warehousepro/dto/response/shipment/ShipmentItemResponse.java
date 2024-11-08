package com.warehousepro.dto.response.shipment;

import com.warehousepro.dto.response.order.OrderItemReponse;
import com.warehousepro.dto.response.warehouse.WareHouseResponseDto;
import com.warehousepro.entity.OrderItem;
import com.warehousepro.entity.Shipment;
import com.warehousepro.entity.Warehouse;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShipmentItemResponse {
  String id;
  Integer quantity;
  ShipmentResponse shipment;
  WareHouseResponseDto warehouse;
  OrderItemReponse orderItem;
}
