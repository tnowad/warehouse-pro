package com.warehousepro.repository;

import com.warehousepro.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository
    extends JpaRepository<User, String>, JpaSpecificationExecutor<User> {

  Optional<User> findByEmail(String email);

  boolean existsByEmail(String email);

  List<User> findUsersByRoles_Name(String name);

  Optional<User> findByName(String name);

  List<User> findByNameIgnoreCaseContaining(String query);
}
