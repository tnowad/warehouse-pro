package com.warehousepro.dto.request.inventory;

import com.warehousepro.entity.Product;
import com.warehousepro.entity.Warehouse;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateInventoryRequest {
  Integer quantity;
  Integer minimumStockLevel;
  String status;
  Product product;
  Warehouse warehouse;
}
