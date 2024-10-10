package com.warehousepro.specification;

import com.warehousepro.entity.Warehouse;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public interface WareHouseSpecification {
    public Specification<Warehouse> hasName(String name);
    public Specification<Warehouse> hasLocation(String location);
    public Specification<Warehouse> hasCapacityGreaterThanOrEqual(Integer capacity);
    public Specification<Warehouse> hasManagerId(Integer managerId);
    public Specification<Warehouse> onCreatedAt(LocalDate createdDate);
    public Specification<Warehouse> onUpdatedAt(LocalDate createdDate);
}
