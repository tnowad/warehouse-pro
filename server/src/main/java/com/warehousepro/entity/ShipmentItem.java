package com.warehousepro.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShipmentItem {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  String id;

  Integer quantity;

  @ManyToOne
  @JoinColumn(name = "shipment_id")
  Shipment shipment;

  @ManyToOne
  @JoinColumn(name = "warehouse_id")
  Warehouse warehouse;

  @ManyToOne
  @JoinColumn(name = "order_item_id")
  OrderItem orderItem;
}
