package com.warehousepro.repository;

import com.warehousepro.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface PermissionRepository extends JpaRepository<Permission , String> {
  List<Permission> findPermissonsByRoles_Name(String name);

  @Query("SELECT p FROM Permission p " +
    "JOIN p.roles r " +
    "JOIN r.users u " +
    "WHERE u.id = :userId")
  Set<Permission> findPermissionsByUsersId(@Param("userId") String userId);
}
