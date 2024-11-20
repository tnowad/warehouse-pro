package com.warehousepro.entity;

import jakarta.persistence.*;
import java.util.Date;
import java.util.Set;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Supplier {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  String id;

  @Column(name = "name")
  String name;

  @Column(name = "contact_info")
  String contact;

  @Column(name = "address")
  String address;

  @CreationTimestamp Date createdAt;

  @UpdateTimestamp Date updatedAt;

  @OneToMany(
      cascade = CascadeType.ALL,
      fetch = FetchType.LAZY,
      mappedBy = "supplier",
      orphanRemoval = true)
  Set<Procurement> procurements;

  @OneToMany(
      cascade = CascadeType.ALL,
      fetch = FetchType.LAZY,
      mappedBy = "supplier",
      orphanRemoval = true)
  Set<SupplierProduct> supplierProducts;
}
