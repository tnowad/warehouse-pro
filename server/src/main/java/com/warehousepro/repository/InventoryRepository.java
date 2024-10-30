package com.warehousepro.repository;

import com.warehousepro.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepository extends
  JpaRepository<Inventory, String> , JpaSpecificationExecutor<Inventory> {
}
