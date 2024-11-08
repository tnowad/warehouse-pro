package com.warehousepro.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDate;
import java.util.HashSet;
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

  @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  @JoinTable(
    name = "user_roles",
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "role_id")
  )
  Set<Role> roles = new HashSet<>();

  @OneToMany(cascade = CascadeType.ALL , fetch = FetchType.LAZY,
    mappedBy = "user",
    orphanRemoval = true
  )
  Set<AuditLog> auditLogs = new HashSet<>();

  public void addRole(Role role){
    this.roles.add(role);
  }

  public void removeRole(String name){
    Role role = this.roles.stream().filter(role1 -> role1.getName() == name).findFirst().orElse(null);
    if(role == null){
      this.roles.remove(role);
      role.getUsers().remove(this);
    }
  }



}
