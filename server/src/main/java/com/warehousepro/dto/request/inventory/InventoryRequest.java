package com.warehousepro.dto.request.inventory;


import com.warehousepro.entity.Product;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InventoryRequest {
  Integer quantity;
  Integer minimumStockLevel;
  String status;
  Product product;
}
