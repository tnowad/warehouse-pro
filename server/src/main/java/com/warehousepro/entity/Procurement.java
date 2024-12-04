package com.warehousepro.entity;

import jakarta.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

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
  @Enumerated(EnumType.STRING)
  ProcurementStatus status;

  @Column(name = "total_cost")
  Double totalCost;

  @CreationTimestamp Date createdAt;

  @OneToMany(
      cascade = CascadeType.ALL,
      fetch = FetchType.LAZY,
      mappedBy = "procurement",
      orphanRemoval = true)
  Set<ProcurementItem> procurementItems = new HashSet<>();

  @ManyToOne
  @JoinColumn(name = "supplier_id")
  Supplier supplier;
}
