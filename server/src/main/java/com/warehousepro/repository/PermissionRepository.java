package com.warehousepro.repository;

import com.warehousepro.entity.Permission;
import com.warehousepro.entity.PermissionName;
import java.util.List;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionRepository
    extends JpaRepository<Permission, String>, JpaSpecificationExecutor<Permission> {

  List<Permission> findPermissionsByRoles_Name(String name);

  Set<Permission> findPermissionsByRoles_Users_Id(String userId);

  Permission findByName(PermissionName name);

  Set<Permission> findDistinctByRoles_IdIn(List<String> roleIds);

  Set<Permission> findPermissionsByRoles_Id(String id);

  Set<Permission> findAllByIdIn(Set<String> ids);
}
