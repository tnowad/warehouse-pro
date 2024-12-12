package com.warehousepro.repository;

import com.warehousepro.entity.Shipment;
import com.warehousepro.entity.ShipmentStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ShipmentRepository
    extends JpaRepository<Shipment, String>, JpaSpecificationExecutor<Shipment> {
  long countByStatus(ShipmentStatus status);
}
