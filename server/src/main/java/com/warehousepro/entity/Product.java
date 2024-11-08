package com.warehousepro.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.warehousepro.dto.request.inventory.CreateInventoryRequest;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  String id;

  @Column(name = "name")
  String name;

  @Column(name = "description")
  String description;

  @Column(name = "sku")
  String sku;

  @Column(name = "price")
  Double price;

  @CreationTimestamp
  Date createdAt;

  @UpdateTimestamp
  Date updatedAt;

  @OneToMany(cascade = CascadeType.ALL , fetch = FetchType.LAZY,
    mappedBy = "product",
    orphanRemoval = true
  )
  Set<Inventory> inventories = new HashSet<>();

  @OneToMany(cascade = CascadeType.ALL , fetch = FetchType.LAZY,
    mappedBy = "product",
    orphanRemoval = true
  )
  Set<ProcurementItem> procurementItems =new HashSet<>();

}
