package com.warehousepro.repository;

import com.warehousepro.entity.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WareHouseRepository extends JpaRepository<Warehouse, Integer> {
    Optional<Warehouse> findByWarehouseId(int warehouseId);

    @Override
    void deleteById(Integer integer);

    @Override
    boolean existsById(Integer integer);
}
