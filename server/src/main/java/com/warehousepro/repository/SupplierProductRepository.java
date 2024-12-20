package com.warehousepro.repository;

import com.warehousepro.entity.SupplierProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierProductRepository
    extends JpaRepository<SupplierProduct, String>, JpaSpecificationExecutor<SupplierProduct> {
  boolean existsBySupplierIdAndProductId(String supplierId, String productId);
}
