package com.warehousepro.entity;

import jakarta.persistence.*;
import java.util.Date;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Return {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  String id;

  @Column(name = "return_date")
  Date returnDate;

  @Column(name = "reason")
  String reason;

  @Column(name = "status")
  String status;

  @ManyToOne
  @JoinColumn(name = "order_item_id")
  OrderItem orderItem;
}
