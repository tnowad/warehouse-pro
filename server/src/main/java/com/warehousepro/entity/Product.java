package com.warehousepro.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.proxy.HibernateProxy;

import java.util.Date;
import java.util.Objects;

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

  @Column(name = "created_at")
  @CreationTimestamp
  Date createdAt;

  @Column(name = "updated_at")
  @UpdateTimestamp
  Date updatedAt;


}
