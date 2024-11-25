package com.warehousepro.dto.response.inventory;

import com.warehousepro.dto.response.product.ProductResponse;
import com.warehousepro.dto.response.warehouse.WareHouseResponse;
import java.util.Date;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InventoryResponse {
  String id;
  Integer quantity;
  Integer minimumStockLevel;
  String status;
  String productId;
  String warehouseId;
  Date createdAt;
  Date updatedAt;
}
