package com.warehousepro.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProcurementItem {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  String id;

  @Column(name = "quantity")
  Integer quantity;

  @Column(name = "price")
  Double price;

  @ManyToOne
  @JoinColumn(name = "warehouse_id")
  Warehouse warehouse;

  @ManyToOne
  @JoinColumn(name = "product_id")
  Product product;

  @ManyToOne
  @JoinColumn(name = "procurement_id")
  Procurement procurement;
}
