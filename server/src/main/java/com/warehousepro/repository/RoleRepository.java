package com.warehousepro.repository;

import com.warehousepro.entity.Permission;
import com.warehousepro.entity.Role;
import java.util.List;
import java.util.Set;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository
    extends JpaRepository<Role, String>, JpaSpecificationExecutor<Role> {
  Set<Role> findRolesByUsersId(String id);

  @Query("SELECT r.id FROM Role r JOIN r.users u WHERE u.id = :userId")
  Set<String> findRoleIdsByUserId(String userId);

  Role findByName(String name);

  @Query("SELECT r FROM Role r JOIN r.users u WHERE u.id = :userId")
  List<Role> findByUserId(String userId);

  @Modifying
  @Query(value = "DELETE FROM users_roles WHERE role_id = :roleId", nativeQuery = true)
  void deleteUserRolesByRoleId(@Param("roleId") String roleId);

  @Modifying
  @Query(value = "DELETE FROM roles_permissions WHERE role_id = :roleId", nativeQuery = true)
  void deletePermissionRolesByRoleId(@Param("roleId") String roleId);

  @Query("DELETE FROM Role r WHERE r.id = :roleId")
  void deleteRoleById(@Param("roleId") String roleId);

  @Query("SELECT r FROM Role r JOIN FETCH r.permissions")
  List<Role> findAllRolesWithPermissions();

  @Query("SELECT r FROM Role r WHERE LOWER(r.name) LIKE LOWER(CONCAT('%', :query, '%'))")
  List<Role> searchRoles(@Param("query") String query);

  @Override
  long count();

  @Query("SELECT r FROM Role r LEFT JOIN FETCH r.permissions WHERE r.id = :id")
  Set<Permission> findPermissionsByRolesId(String id);

  @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END " +
    "FROM Role r JOIN r.permissions p " +
    "WHERE r.id = :roleId AND p = :permission")
  boolean existsByRoleIdAndPermission(@Param("roleId") String roleId, @Param("permission") Permission permission);


  @Override
  Page<Role> findAll(Specification<Role> spec, Pageable pageable);
}
