package com.warehousepro.dto.response.inventory;

import com.warehousepro.entity.Product;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InventoryResponse {
  String id;
  Integer quantity;
  Date lastUpDate;
  Integer minimumStockLevel;
  String status;
  Product product;
}
