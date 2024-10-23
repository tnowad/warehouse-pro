package com.warehousepro.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDate;
import java.util.Set;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "users", uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  String id;

  @Column(name = "email", nullable = false, unique = true)
  String email;

  @Column(name = "name", nullable = false)
  String name;

  @Column(name = "password", nullable = false)
  String password;

  @Column(name = "created_at", nullable = false)
  @CreationTimestamp
  LocalDate createdAt;

  @Column(name = "updated_at", nullable = false)
  @UpdateTimestamp
  LocalDate updatedAt;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"),
      inverseJoinColumns = @JoinColumn(name = "role_id"))
  Set<Role> roles;
}
