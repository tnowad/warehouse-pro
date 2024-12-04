package com.warehousepro.repository;

import com.warehousepro.entity.ShipmentTracking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ShipmentTrackingRepository extends JpaRepository<ShipmentTracking, String>, JpaSpecificationExecutor<ShipmentTracking> {
  @Override
  long count();
}
