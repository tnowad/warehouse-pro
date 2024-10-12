package com.warehousepro.specification;

import com.warehousepro.entity.Warehouse;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import java.time.LocalDate;

@Component
public class WareHouseSpecificationImpl implements WareHouseSpecification {
  @Override
  public Specification<Warehouse> hasName(String name) {
    return (root, query, criteriaBuilder) -> {
      if (name == null || name.isEmpty()) {
        return criteriaBuilder.conjunction();
      }
      return criteriaBuilder.like(criteriaBuilder.lower(root.get("warehouseName")),
          "%" + name.toLowerCase() + "%");
    };
  }

  @Override
  public Specification<Warehouse> hasLocation(String location) {
    return (root, query, criteriaBuilder) -> {
      if (location == null || location.isEmpty()) {
        return criteriaBuilder.conjunction();
      }
      return criteriaBuilder.like(criteriaBuilder.lower(root.get("location")),
          "%" + location.toLowerCase() + "%");
    };
  }

  @Override
  public Specification<Warehouse> hasCapacityGreaterThanOrEqual(Integer capacity) {
    return (root, query, criteriaBuilder) -> {
      if (capacity == null) {
        return criteriaBuilder.conjunction();
      }
      return criteriaBuilder.equal(root.get("capacity"), capacity);
    };
  }

  @Override
  public Specification<Warehouse> hasManagerId(Integer managerId) {
    return (root, query, criteriaBuilder) -> {
      if (managerId == null) {
        return criteriaBuilder.conjunction();
      }
      return criteriaBuilder.equal(root.get("managerId"), managerId);
    };
  }

  @Override
  public Specification<Warehouse> onCreatedAt(LocalDate createdAt) {
    return (root, query, criteriaBuilder) -> {
      if (createdAt == null) {
        return criteriaBuilder.conjunction();
      }
      return criteriaBuilder.equal(root.get("createdAt"), createdAt);
    };
  }

  @Override
  public Specification<Warehouse> onUpdatedAt(LocalDate updatedAt) {
    return (root, query, criteriaBuilder) -> {
      if (updatedAt == null) {
        return criteriaBuilder.conjunction();
      }
      return criteriaBuilder.equal(root.get("updatedAt"), updatedAt);
    };
  }

}
