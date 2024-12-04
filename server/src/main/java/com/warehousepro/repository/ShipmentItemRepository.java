package com.warehousepro.repository;

import com.warehousepro.entity.ShipmentItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ShipmentItemRepository extends JpaRepository<ShipmentItem, String> , JpaSpecificationExecutor<ShipmentItem> {
  @Override
  long count();
}
