package com.warehousepro.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "warehouses")
public class Warehouse {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  String id;

  @Column(name = "name", nullable = false)
  String name;

  @Column(name = "location", nullable = false)
  String location;

  @Column(name = "capacity", nullable = false)
  Integer capacity;

  @Column(name = "created_at", nullable = false)
  @CreationTimestamp
  LocalDate createdAt;

  @Column(name = "updated_at", nullable = false)
  @UpdateTimestamp
  LocalDate updatedAt;

  @OneToMany(cascade = CascadeType.ALL , fetch = FetchType.LAZY,
    mappedBy = "warehouse",
    orphanRemoval = true
  )
  Set<Inventory> inventories = new HashSet<>();

  @OneToMany(cascade = CascadeType.ALL , fetch = FetchType.LAZY,
    mappedBy = "warehouse",
    orphanRemoval = true
  )
  Set<ProcurementItem> procurementItems = new HashSet<>();

  @OneToMany(cascade = CascadeType.ALL , fetch = FetchType.LAZY,
    mappedBy = "warehouse",
    orphanRemoval = true
  )
  Set<ShipmentItem> shipmentItems;

  @OneToMany(cascade = CascadeType.ALL , fetch = FetchType.LAZY,
    mappedBy = "warehouse",
    orphanRemoval = true
  )
  Set<RoleAssignment> roleAssignments;
}
