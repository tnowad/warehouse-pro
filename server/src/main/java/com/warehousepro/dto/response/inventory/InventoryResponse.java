package com.warehousepro.dto.response.inventory;

import com.warehousepro.dto.response.product.ProductResponse;
import com.warehousepro.dto.response.warehouse.WareHouseResponseDto;
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
  ProductResponse product;
  WareHouseResponseDto warehouse;
}