package com.warehousepro.entity;

import com.warehousepro.enums.OrderStatus;
import com.warehousepro.enums.PaymentStatus;
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
@Table(name = "orders")
public class Order {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  String id;

  @Column(name = "status")
  @Enumerated(EnumType.STRING)
  OrderStatus status;

  @Column(name = "total_amount")
  Double totalAmount;

  @Column(name = "payment_status")
  @Enumerated(EnumType.STRING)
  PaymentStatus paymentStatus;

  @Column(name = "shipping_address")
  String shippingAddress;

  @CreationTimestamp Date createdAt;

  @UpdateTimestamp Date updatedAt;

  @OneToMany(
      cascade = CascadeType.ALL,
      fetch = FetchType.LAZY,
      mappedBy = "order",
      orphanRemoval = true)
  Set<Shipment> shipments;

  @OneToMany(
      cascade = CascadeType.ALL,
      fetch = FetchType.LAZY,
      mappedBy = "order",
      orphanRemoval = true)
  Set<OrderItem> orderItems;
}
