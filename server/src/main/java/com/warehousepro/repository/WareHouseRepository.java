package com.warehousepro.repository;

import com.warehousepro.entity.Warehouse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface WareHouseRepository
    extends JpaRepository<Warehouse, String>, JpaSpecificationExecutor<Warehouse> {
  Optional<Warehouse> findById(String id);

  @Override
  Page<Warehouse> findAll(Pageable pageable);

  @Override
  Page<Warehouse> findAll(Specification<Warehouse> spec, Pageable pageable);

  @Override
  long count();

  @Override
  Warehouse getById(String id);

  @Override
  void deleteById(String id);

  @Override
  boolean existsById(String id);

}
