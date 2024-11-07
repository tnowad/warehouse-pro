package com.warehousepro.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Role {

  @Id
  @Column(name = "name")
  String name;
  @Column(name = "description")
  String description;

  @CreationTimestamp
  Date createdAt;

  @UpdateTimestamp
  Date updatedAt;

  @ManyToMany(mappedBy = "roles", fetch = FetchType.LAZY , cascade = {
    CascadeType.PERSIST,
    CascadeType.MERGE
  })
  Set<Permission> permissions = new HashSet<>();

  @ManyToMany(mappedBy = "roles", fetch = FetchType.LAZY , cascade = {
    CascadeType.PERSIST,
    CascadeType.MERGE
  })
  @JsonIgnore
  Set<User> users = new HashSet<>();
}
