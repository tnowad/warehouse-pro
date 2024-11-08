package com.warehousepro.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoleAssignment {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  String id;

  @ManyToOne
  @JoinColumn(name = "warehouse_id")
  Warehouse warehouse;

  @ManyToOne
  @JoinColumn(name = "role_name")
  Role role;

}
