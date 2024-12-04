package com.warehousepro.repository;

import com.warehousepro.entity.Permission;
import com.warehousepro.entity.Role;
import java.util.List;
import java.util.Set;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository
    extends JpaRepository<Role, String>, JpaSpecificationExecutor<Role> {

  @Modifying
  @Query(value = "DELETE FROM users_roles WHERE role_id = :roleId", nativeQuery = true)
  void deleteUserRolesByRoleId(@Param("roleId") String roleId);

  @Modifying
  @Query(value = "DELETE FROM roles_permissions WHERE role_id = :roleId", nativeQuery = true)
  void deletePermissionRolesByRoleId(@Param("roleId") String roleId);

  @Override
  long count();

  Set<Role> findRolesByUsersId(String id);

  Set<Role> findByUsersId(String userId);

  Set<String> findIdsByUsersId(String userId);

  Role findByName(String roleName);

  List<Role> findAllByUsersId(String userId);

  @Modifying
  void deleteAllByUsersRolesId(String roleId);

  @Modifying
  void deleteAllByPermissionsRolesId(String roleId);

  @Modifying
  void deleteById(String roleId);

  List<Role> findByNameContainingIgnoreCase(String roleName);

  boolean existsByIdAndPermissionsId(String roleId, String permissionId);

  @EntityGraph(attributePaths = "permissions")
  Set<Permission> findPermissionsById(String roleId);

  @Override
  Page<Role> findAll(Specification<Role> spec, Pageable pageable);
}
