package com.warehousepro.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
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
public class Permission {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  String id;

  @Column(name = "name")
  @Enumerated(EnumType.STRING)
  PermissionName name;

  @Column(name = "description")
  String description;

  @CreationTimestamp LocalDateTime createdAt;

  @UpdateTimestamp LocalDateTime updatedAt;

  @ManyToMany(
      fetch = FetchType.LAZY,
      cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
  @JoinTable(
      name = "role_permissions",
      joinColumns = @JoinColumn(name = "permission_id"),
      inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles;

  public void addRole(Role role) {
    this.roles.add(role);
  }
}
