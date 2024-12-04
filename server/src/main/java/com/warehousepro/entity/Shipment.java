package com.warehousepro.entity;

import jakarta.persistence.*;
import java.util.Date;
import java.util.Set;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Shipment {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  String id;

  @Column(name = "shipment_date")
  Date shipmentDate;

  @Column(name = "status")
  @Enumerated(EnumType.STRING)
  ShipmentStatus status;

  @Column(name = "tracking_number")
  String trackingNumber;

  @Column(name = "shipping_method")
  String shippingMethod;

  @Column(name = "delivery_estimate")
  Date deliveryEstimate;

  @Column(name = "carrier")
  String carrier;

  @ManyToOne
  @JoinColumn(name = "order_id")
  Order order;

  @OneToMany(
      cascade = CascadeType.ALL,
      fetch = FetchType.LAZY,
      mappedBy = "shipment",
      orphanRemoval = true)
  Set<ShipmentTracking> shipmentTracking;

  @OneToMany(
      cascade = CascadeType.ALL,
      fetch = FetchType.LAZY,
      mappedBy = "shipment",
      orphanRemoval = true)
  Set<ShipmentItem> shipmentItems;
}
