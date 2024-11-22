package com.warehousepro.repository;

import com.warehousepro.entity.Role;
import java.util.List;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {
  Set<Role> findRolesByUsersId(String id);

  @Query("SELECT r.id FROM Role r JOIN r.users u WHERE u.id = :userId")
  Set<String> findRoleIdsByUserId(String userId);

  Role findByName(String name);

  @Query("SELECT r FROM Role r JOIN r.users u WHERE u.id = :userId")
  List<Role> findByUserId(String userId);

  @Query("SELECT r FROM Role r JOIN FETCH r.permissions")
  List<Role> findAllRolesWithPermissions();

  @Query("SELECT r FROM Role r WHERE LOWER(r.name) LIKE LOWER(CONCAT('%', :query, '%'))")
  List<Role> searchRoles(@Param("query") String query);

}
