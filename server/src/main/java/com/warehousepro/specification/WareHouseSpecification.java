package com.warehousepro.specification;

import com.warehousepro.dto.request.warehouse.ListWarehouseRequest;
import com.warehousepro.entity.Warehouse;
import java.time.LocalDate;
import org.springframework.data.jpa.domain.Specification;

public interface WareHouseSpecification {
  public Specification<Warehouse> hasName(String name);

  public Specification<Warehouse> hasLocation(String location);

  public Specification<Warehouse> hasCapacityGreaterThanOrEqual(Integer capacity);

  public Specification<Warehouse> hasManagerId(Integer managerId);

  public Specification<Warehouse> onCreatedAt(LocalDate createdDate);

  public Specification<Warehouse> onUpdatedAt(LocalDate createdDate);

  public Specification<Warehouse> getFilterSpecification(ListWarehouseRequest filterRequest);
}
