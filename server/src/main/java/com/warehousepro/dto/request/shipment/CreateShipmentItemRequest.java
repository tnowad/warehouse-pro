package com.warehousepro.dto.request.shipment;

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
public class CreateShipmentItemRequest {
  Integer quantity;
  Shipment shipment;
  Warehouse warehouse;
  OrderItem orderItem;
}
