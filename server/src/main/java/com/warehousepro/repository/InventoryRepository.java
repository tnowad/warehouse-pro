package com.warehousepro.repository;

import com.warehousepro.entity.Inventory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepository extends
  JpaRepository<Inventory, String> , JpaSpecificationExecutor<Inventory> {

  @Query("select invent from Inventory invent where invent.product.id = :product_id")
  Page<Inventory> getListByProductId(@Param("product_id") String id , Pageable pageable);


}
