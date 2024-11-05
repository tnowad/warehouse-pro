package com.warehousepro.entity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.UpdateTimestamp;


import java.util.Date;

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

  @UpdateTimestamp
  @Column(name = "lastUpDate")
  Date lastUpDate;

  @Column(name = "minimumStockLevel")
  Integer minimumStockLevel;

  @Column(name = "status")
  String status;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "product_id")
  Product product;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "warehouse_id")
  Warehouse warehouse;

}
