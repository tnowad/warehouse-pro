package com.warehousepro.dto.response.product;

import com.warehousepro.dto.response.inventory.InventoryResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductResponse {
  String id;
  String name;
  String description;
  String sku;
  Double price;
  Date createdAt;
  Date updatedAt;
}
