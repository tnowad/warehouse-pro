package com.warehousepro.dto.request.product;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateProductRequest {
  String name;
  String description;
  String sku;
  double price;
  LocalDate createdAt;
  LocalDate updatedAt;
}
