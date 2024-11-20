package com.warehousepro.entity;

import jakarta.persistence.*;
import java.util.Date;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShipmentTracking {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  String id;

  @Column(name = "tracking_even")
  String trackingEvent;

  @Column(name = "event_date")
  Date eventDate;

  @Column(name = "location")
  String location;

  @Column(name = "status")
  String status;

  @ManyToOne
  @JoinColumn(name = "shipment_id")
  Shipment shipment;
}
