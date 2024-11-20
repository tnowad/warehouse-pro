package com.warehousepro.dto.response.product;

import java.util.Date;
import lombok.*;
import lombok.experimental.FieldDefaults;

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
