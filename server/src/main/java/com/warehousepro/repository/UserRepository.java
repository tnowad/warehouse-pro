package com.warehousepro.repository;

import com.warehousepro.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
  Optional<User> findByEmail(String user);

  boolean existsByEmail(String email);

  List<User> findUsersByRoles_Name(String id);

}
