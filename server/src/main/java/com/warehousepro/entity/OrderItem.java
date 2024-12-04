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

  @Column(name = "status")
  @Enumerated(EnumType.STRING)
  OrderItemStatus status;

  @ManyToOne
  @JoinColumn(name = "order_id", nullable = false)
  Order order;

  @ManyToOne
  @JoinColumn(name = "product_id", nullable = false)
  Product product;

  @ManyToOne
  @JoinColumn(name = "warehouse_id", nullable = false)
  Warehouse warehouse;

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
