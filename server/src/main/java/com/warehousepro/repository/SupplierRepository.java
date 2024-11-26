package com.warehousepro.repository;

import com.warehousepro.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierRepository
    extends JpaRepository<Supplier, String>, JpaSpecificationExecutor<Supplier> {}
