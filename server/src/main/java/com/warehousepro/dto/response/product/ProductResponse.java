package com.warehousepro.dto.response.product;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

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
  LocalDate createdAt;
  LocalDate updatedAt;
}
