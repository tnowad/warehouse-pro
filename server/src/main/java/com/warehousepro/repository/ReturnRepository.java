package com.warehousepro.repository;

import com.warehousepro.entity.Return;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ReturnRepository
    extends JpaRepository<Return, String>, JpaSpecificationExecutor<Return> {}
