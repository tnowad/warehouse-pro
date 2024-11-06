package com.warehousepro.dto.request.product;

import com.warehousepro.dto.request.inventory.CreateInventoryRequest;
import com.warehousepro.entity.Inventory;
import lombok.*;
import lombok.experimental.FieldDefaults;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateProductRequest {
  String name;
  String description;
  String sku;
  Double price;

}
