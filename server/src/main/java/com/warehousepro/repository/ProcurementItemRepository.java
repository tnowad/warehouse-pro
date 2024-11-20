package com.warehousepro.repository;

import com.warehousepro.entity.ProcurementItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProcurementItemRepository extends JpaRepository<ProcurementItem, String> {}
