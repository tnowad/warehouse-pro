package com.warehousepro.specification;

import com.warehousepro.dto.request.warehouse.ListWarehouseRequest;
import com.warehousepro.entity.Warehouse;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class WareHouseSpecificationImpl implements WareHouseSpecification {
  @Override
  public Specification<Warehouse> hasName(String name) {
    return (root, query, criteriaBuilder) -> {
      if (name == null || name.isEmpty()) {
        return criteriaBuilder.conjunction();
      }
      return criteriaBuilder.like(
          criteriaBuilder.lower(root.get("warehouseName")), "%" + name.toLowerCase() + "%");
    };
  }

  @Override
  public Specification<Warehouse> hasLocation(String location) {
    return (root, query, criteriaBuilder) -> {
      if (location == null || location.isEmpty()) {
        return criteriaBuilder.conjunction();
      }
      return criteriaBuilder.like(
          criteriaBuilder.lower(root.get("location")), "%" + location.toLowerCase() + "%");
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

  @Override
  public Specification<Warehouse> getFilterSpecification(ListWarehouseRequest filterRequest) {
    return (Root<Warehouse> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
      List<Predicate> predicates = new ArrayList<>();

      if (filterRequest.getIds() != null && !filterRequest.getIds().isEmpty()) {
        predicates.add(root.get("id").in(filterRequest.getIds()));
      }

      if (filterRequest.getName() != null && !filterRequest.getName().isEmpty()) {
        predicates.add(
            criteriaBuilder.like(
                criteriaBuilder.lower(root.get("name")),
                "%" + filterRequest.getName().toLowerCase() + "%"));
      }

      if (filterRequest.getLocation() != null && !filterRequest.getLocation().isEmpty()) {
        predicates.add(
            criteriaBuilder.like(
                criteriaBuilder.lower(root.get("location")),
                "%" + filterRequest.getLocation().toLowerCase() + "%"));
      }

      if (filterRequest.getCapacity() != null && !filterRequest.getCapacity().isEmpty()) {
        predicates.add(criteriaBuilder.equal(root.get("capacity"), filterRequest.getCapacity()));
      }

      if (filterRequest.getCreatedAt() != null && !filterRequest.getCreatedAt().isEmpty()) {
        predicates.add(criteriaBuilder.equal(root.get("createdAt"), filterRequest.getCreatedAt()));
      }

      if (filterRequest.getUpdatedAt() != null && !filterRequest.getUpdatedAt().isEmpty()) {
        predicates.add(criteriaBuilder.equal(root.get("updatedAt"), filterRequest.getUpdatedAt()));
      }

      if (filterRequest.getQuery() != null && !filterRequest.getQuery().isEmpty()) {
        String queryParam = "%" + filterRequest.getQuery().toLowerCase() + "%";
        Predicate namePredicate =
            criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), queryParam);
        Predicate locationPredicate =
            criteriaBuilder.like(criteriaBuilder.lower(root.get("location")), queryParam);
        predicates.add(criteriaBuilder.or(namePredicate, locationPredicate));
      }

      if (StringUtils.hasLength(filterRequest.getSort())) {
        String[] sortParams = filterRequest.getSort().split(",");
        List<jakarta.persistence.criteria.Order> orders = new ArrayList<>();

        for (String sortParam : sortParams) {
          String[] sortFieldAndDirection = sortParam.split(":");
          String sortField = sortFieldAndDirection[0];

          switch (sortField) {
            case "name":
            case "location":
            case "capacity":
            case "createdAt":
            case "updatedAt":
              System.out.println("sortField: " + sortField);
              Sort.Direction sortDirection =
                  (sortFieldAndDirection.length > 1
                          && "desc".equalsIgnoreCase(sortFieldAndDirection[1]))
                      ? Sort.Direction.DESC
                      : Sort.Direction.ASC;

              orders.add(
                  sortDirection == Sort.Direction.ASC
                      ? criteriaBuilder.asc(root.get(sortField))
                      : criteriaBuilder.desc(root.get(sortField)));
            default:
          }
        }

        if (!orders.isEmpty()) {
          query.orderBy(orders);
        }
      }

      return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    };
  }
}
