package com.warehousepro.repository;

import com.warehousepro.entity.Permission;
import com.warehousepro.entity.PermissionName;
import java.util.List;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionRepository
    extends JpaRepository<Permission, String>, JpaSpecificationExecutor<Permission> {
  List<Permission> findPermissonsByRoles_Name(String name);

  @Query(
      "SELECT p FROM Permission p "
          + "JOIN p.roles r "
          + "JOIN r.users u "
          + "WHERE u.id = :userId")
  Set<Permission> findPermissionsByUsersId(@Param("userId") String userId);

  Permission findByName(PermissionName name);

  @Query("SELECT p.name FROM Permission p " + "JOIN p.roles r " + "WHERE r.id IN :roleIds")
  List<PermissionName> getPermissionNamesByRoleIds(List<String> roleIds);
}
