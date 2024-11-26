package com.warehousepro.repository;

import com.warehousepro.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository
    extends JpaRepository<User, String>, JpaSpecificationExecutor<User> {
  Optional<User> findByEmail(String user);

  boolean existsByEmail(String email);

  List<User> findUsersByRoles_Name(String id);

  Optional<User> findByName(String user);

  @Query("SELECT u FROM User u WHERE LOWER(u.name) LIKE LOWER(CONCAT('%', :query, '%'))")
  List<User> searchRoles(@Param("query") String query);

  @Override
  long count();

  @Override
  Page<User> findAll(Specification<User> spec, Pageable pageable);
}
