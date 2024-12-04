package com.warehousepro.repository;

import com.warehousepro.entity.Procurement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProcurementRepository
    extends JpaRepository<Procurement, String>, JpaSpecificationExecutor<Procurement> {}
