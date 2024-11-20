package com.warehousepro.entity;

import jakarta.persistence.*;
import java.util.Date;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.validator.constraints.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuditLog {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  String id;

  @Column(name = "table_name")
  String tableName;

  @UUID
  @Column(name = "record_id")
  String recordId;

  @Column(name = "action")
  String action;

  @Column(name = "change_date")
  @UpdateTimestamp
  Date changeDate;

  @Column(name = "detail")
  String detail;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  User user;
}
