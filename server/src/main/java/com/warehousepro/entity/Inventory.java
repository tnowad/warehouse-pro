package com.warehousepro.entity;

import jakarta.persistence.*;
import java.util.Date;
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
public class Inventory {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id")
  String id;

  @Column(name = "quantity")
  Integer quantity;

  @CreationTimestamp
  Date createdAt;

  @UpdateTimestamp
  Date updatedAt;

  @Column(name = "minimumStockLevel")
  Integer minimumStockLevel;

  @Column(name="price")
  Integer price;

  @Column(name = "status")
    @Enumerated(EnumType.STRING)
  InventoryStatus status;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "product_id")
  Product product;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "warehouse_id")
  Warehouse warehouse;
}

