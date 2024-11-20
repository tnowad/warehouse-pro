package com.warehousepro.entity;

import jakarta.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  String id;

  @Column(name = "name")
  String name;

  @Column(name = "description")
  String description;

  @Column(name = "sku")
  String sku;

  @Column(name = "price")
  Double price;

  @CreationTimestamp Date createdAt;

  @UpdateTimestamp Date updatedAt;

  @OneToMany(
      cascade = CascadeType.ALL,
      fetch = FetchType.LAZY,
      mappedBy = "product",
      orphanRemoval = true)
  Set<Inventory> inventories = new HashSet<>();

  @OneToMany(
      cascade = CascadeType.ALL,
      fetch = FetchType.LAZY,
      mappedBy = "product",
      orphanRemoval = true)
  Set<ProcurementItem> procurementItems = new HashSet<>();

  @OneToMany(
      cascade = CascadeType.ALL,
      fetch = FetchType.LAZY,
      mappedBy = "product",
      orphanRemoval = true)
  Set<SupplierProduct> supplierProducts;

  @OneToMany(
      cascade = CascadeType.ALL,
      fetch = FetchType.LAZY,
      mappedBy = "product",
      orphanRemoval = true)
  Set<OrderItem> orderItems;
}
