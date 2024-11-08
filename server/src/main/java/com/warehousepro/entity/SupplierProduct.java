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
public class SupplierProduct {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  String id;

  @Column(name = "lead_time_dates")
  Integer leadTimeDays;

  @Column(name = "price")
  Double price;

  @Column(name = "availability_status")
  String availabilityStatus;


  @ManyToOne
  @JoinColumn(name = "supplier_id")
  Supplier supplier;

  @ManyToOne
  @JoinColumn(name = "product_id")
  Product product;

}
