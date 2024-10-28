package com.warehousepro.dto.response.product;

import lombok.*;
import lombok.experimental.FieldDefaults;
import java.util.Date;

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
