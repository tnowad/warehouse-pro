package com.warehousepro.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int productId;

  String name;
  String description;
  String sku;
  double price;
  LocalDate createdAt;
  LocalDate updatedAt;


}
