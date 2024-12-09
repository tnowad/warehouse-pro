package com.warehousepro.dto.response.shipment;

import com.warehousepro.dto.response.order.OrderItemResponse;
import com.warehousepro.dto.response.warehouse.WareHouseResponse;
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
  WareHouseResponse warehouse;
  OrderItemResponse orderItem;
}
