package com.warehousepro.specification;

import com.warehousepro.dto.request.inventory.ListInventoryRequest;
import com.warehousepro.entity.Inventory;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class InventorySpecification {

  // Filter by quantity
  public Specification<Inventory> hasQuantity(Integer quantity) {
    return (root, query, criteriaBuilder) ->
        quantity != null
            ? criteriaBuilder.equal(root.get("quantity"), quantity)
            : criteriaBuilder.conjunction();
  }

  // Filter by minimumStockLevel
  public Specification<Inventory> hasMinimumStockLevel(Integer minimumStockLevel) {
    return (root, query, criteriaBuilder) ->
        minimumStockLevel != null
            ? criteriaBuilder.equal(root.get("minimumStockLevel"), minimumStockLevel)
            : criteriaBuilder.conjunction();
  }

  // Filter by status
  public Specification<Inventory> hasStatus(String status) {
    return (root, query, criteriaBuilder) ->
        StringUtils.hasText(status)
            ? criteriaBuilder.equal(root.get("status"), status)
            : criteriaBuilder.conjunction();
  }

  // Filter by createdAt
  public Specification<Inventory> hasCreatedAt(String createdAt) {
    return (root, query, criteriaBuilder) ->
        StringUtils.hasText(createdAt)
            ? criteriaBuilder.equal(root.get("createdAt"), createdAt)
            : criteriaBuilder.conjunction();
  }

  // Filter by updatedAt
  public Specification<Inventory> hasUpdatedAt(String updatedAt) {
    return (root, query, criteriaBuilder) ->
        StringUtils.hasText(updatedAt)
            ? criteriaBuilder.equal(root.get("updatedAt"), updatedAt)
            : criteriaBuilder.conjunction();
  }

  // Filter by warehouseIds
  public Specification<Inventory> hasWarehouseIds(List<String> warehouseIds) {
    return (root, query, criteriaBuilder) ->
        warehouseIds != null && !warehouseIds.isEmpty()
            ? root.get("warehouseId").in(warehouseIds)
            : criteriaBuilder.conjunction();
  }

  // Filter by productIds
  public Specification<Inventory> hasProductIds(List<String> productIds) {
    return (root, query, criteriaBuilder) ->
        productIds != null && !productIds.isEmpty()
            ? root.get("productId").in(productIds)
            : criteriaBuilder.conjunction();
  }

  // Combine all filters into one Specification
  public Specification<Inventory> getFilterSpecification(ListInventoryRequest filterRequest) {
    return (root, query, criteriaBuilder) -> {
      List<Predicate> predicates = new ArrayList<>();

      // Apply filters based on the request fields
      if (filterRequest.getQuantity() != null) {
        predicates.add(
            hasQuantity(filterRequest.getQuantity()).toPredicate(root, query, criteriaBuilder));
      }

      if (filterRequest.getMinimumStockLevel() != null) {
        predicates.add(
            hasMinimumStockLevel(filterRequest.getMinimumStockLevel())
                .toPredicate(root, query, criteriaBuilder));
      }

      if (StringUtils.hasText(filterRequest.getStatus())) {
        predicates.add(
            hasStatus(filterRequest.getStatus()).toPredicate(root, query, criteriaBuilder));
      }

      // Apply filters for createdAt and updatedAt if they are provided
      if (StringUtils.hasText(filterRequest.getCreatedAt())) {
        predicates.add(
            hasCreatedAt(filterRequest.getCreatedAt()).toPredicate(root, query, criteriaBuilder));
      }

      if (StringUtils.hasText(filterRequest.getUpdatedAt())) {
        predicates.add(
            hasUpdatedAt(filterRequest.getUpdatedAt()).toPredicate(root, query, criteriaBuilder));
      }

      // Apply filters for warehouseIds
      if (filterRequest.getWarehouseIds() != null && !filterRequest.getWarehouseIds().isEmpty()) {
        predicates.add(
            hasWarehouseIds(filterRequest.getWarehouseIds())
                .toPredicate(root, query, criteriaBuilder));
      }

      // Apply filters for productIds
      if (filterRequest.getProductIds() != null && !filterRequest.getProductIds().isEmpty()) {
        predicates.add(
            hasProductIds(filterRequest.getProductIds()).toPredicate(root, query, criteriaBuilder));
      }

      // Handle sorting if needed
      if (filterRequest.getSort() != null && !filterRequest.getSort().isEmpty()) {
        String[] sortParams = filterRequest.getSort().split(",");
        List<Order> orders = new ArrayList<>();

        for (String sortParam : sortParams) {
          String[] sortFieldAndDirection = sortParam.split(":");
          String sortField = sortFieldAndDirection[0];

          switch (sortField) {
            case "quantity":
            case "minimumStockLevel":
            case "status":
            case "createdAt":
            case "updatedAt":
              // Default to ascending if not specified
              org.springframework.data.domain.Sort.Direction sortDirection =
                  (sortFieldAndDirection.length > 1
                          && "desc".equalsIgnoreCase(sortFieldAndDirection[1]))
                      ? org.springframework.data.domain.Sort.Direction.DESC
                      : org.springframework.data.domain.Sort.Direction.ASC;

              orders.add(
                  sortDirection == org.springframework.data.domain.Sort.Direction.ASC
                      ? criteriaBuilder.asc(root.get(sortField))
                      : criteriaBuilder.desc(root.get(sortField)));
              break;
            default:
              break;
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
