package com.warehousepro.repository;

import com.warehousepro.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface RoleRepository extends JpaRepository<Role , String> {
  Set<Role> findRolesByUsersId(String id);

}
