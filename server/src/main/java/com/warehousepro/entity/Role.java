package com.warehousepro.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Role {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  String id;

  @Column(name = "name", nullable = false, unique = true)
  String name;

  @Column(name = "description")
  String description;

  @CreationTimestamp LocalDateTime createdAt;

  @UpdateTimestamp LocalDateTime updatedAt;

  @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  @JoinTable(
      name = "roles_permissions",
      joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"),
      inverseJoinColumns = @JoinColumn(name = "permission_id", referencedColumnName = "id"))
  Set<Permission> permissions = new HashSet<>();

  @ManyToMany(mappedBy = "roles", cascade = CascadeType.PERSIST)
  private Set<User> users;

  public void addPermission(Permission permission) {
    this.permissions.add(permission);
  }
}
