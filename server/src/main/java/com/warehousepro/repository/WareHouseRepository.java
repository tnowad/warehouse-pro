package com.warehousepro.repository;

import com.warehousepro.entity.Warehouse;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WareHouseRepository extends JpaRepository<Warehouse, Integer> {
    Optional<Warehouse> findByWarehouseId(int warehouseId);

    @Override
    Page<Warehouse> findAll(Pageable pageable);

    @Override
    long count();

    @Override
    Warehouse getById(Integer integer);

    @Override
    void deleteById(Integer integer);

    @Override
    boolean existsById(Integer integer);
}
