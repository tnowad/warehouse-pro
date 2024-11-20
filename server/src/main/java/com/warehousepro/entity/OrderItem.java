package com.warehousepro.entity;

import jakarta.persistence.*;
import java.util.Set;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderItem {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  String id;

  @Column(name = "quantity")
  Integer quantity;

  @Column(name = "price")
  Double price;

  @Column(name = "total_price")
  Double totalPrice;

  @Column(name = "discount")
  Double discount;

  @ManyToOne
  @JoinColumn(name = "order_id")
  Order order;

  @ManyToOne
  @JoinColumn(name = "product_id")
  Product product;

  @OneToMany(
      cascade = CascadeType.ALL,
      fetch = FetchType.LAZY,
      mappedBy = "orderItem",
      orphanRemoval = true)
  Set<Return> returns;

  @OneToMany(
      cascade = CascadeType.ALL,
      fetch = FetchType.LAZY,
      mappedBy = "orderItem",
      orphanRemoval = true)
  Set<ShipmentItem> shipmentItems;
}
