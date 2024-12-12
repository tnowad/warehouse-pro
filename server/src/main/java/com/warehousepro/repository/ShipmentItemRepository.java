package com.warehousepro.repository;

import com.warehousepro.entity.ShipmentItem;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ShipmentItemRepository
    extends JpaRepository<ShipmentItem, String>, JpaSpecificationExecutor<ShipmentItem> {
  @Override
  long count();

  List<ShipmentItem> findAllByShipmentId(String shipmentId);
}
