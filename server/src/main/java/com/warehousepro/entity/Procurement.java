package com.warehousepro.entity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Procurement {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  String id;

  @Column(name = "order_date")
  Date orderDate;

  @Column(name = "delivery_date")
  Date deliveryDate;

  @Column(name = "status")
  String status;

  @Column(name = "total_cost")
  Double totalCost;

  @CreationTimestamp
  Date createdAt;

  @OneToMany(cascade = CascadeType.ALL , fetch = FetchType.LAZY,
    mappedBy = "procurement",
    orphanRemoval = true
  )
  Set<ProcurementItem> procurementItems = new HashSet<>();

  @ManyToOne
  @JoinColumn(name = "supplier_id")
  Supplier supplier;

}
