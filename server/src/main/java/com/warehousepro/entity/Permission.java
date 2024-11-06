package com.warehousepro.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Permission {

  @Id
  @Column(name = "name")
  String name;

  @Column(name = "description")
  String description;

  @CreationTimestamp
  LocalDate createdAt;
  @UpdateTimestamp
  LocalDate updatedAt;

  @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  @JoinTable(
    name = "role_permissions",
    joinColumns = @JoinColumn(name = "permission_name"),
    inverseJoinColumns = @JoinColumn(name = "role_name")
  )
  private Set<Role> roles = new HashSet<>();

  public void addRole(Role role){
    this.roles.add(role);
  }




}
