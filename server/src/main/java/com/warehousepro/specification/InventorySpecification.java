package com.warehousepro.specification;

import com.warehousepro.entity.Inventory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
public class InventorySpecification {

  public Specification<Inventory> containStatus(String providedStatus) {
    return (root, query, criteriaBuilder) ->
        criteriaBuilder.like(
            criteriaBuilder.lower(root.get("status")), "%" + providedStatus.toLowerCase() + "%");
  }

  public Specification<Inventory> onUpdatedAt(String lastUpdatedAt) {
    return (root, query, criteriaBuilder) -> {
      if (lastUpdatedAt == null) {
        return criteriaBuilder.conjunction();
      }
      return criteriaBuilder.equal(root.get("lastUpDate"), lastUpdatedAt);
    };
  }

  public Specification<Inventory> hasMinimumStockLevel(String providedMinimumStockLevel) {
    return (root, query, criteriaBuilder) ->
        criteriaBuilder.equal(root.get("minimumStockLevel"), providedMinimumStockLevel);
  }

  public Specification<Inventory> hasQuantity(String providedQuantity) {
    return (root, query, criteriaBuilder) ->
        criteriaBuilder.equal(root.get("quantity"), providedQuantity);
  }

  public Specification<Inventory> hasProduct(String provideProduct) {
    return (root, query, criteriaBuilder) ->
        criteriaBuilder.equal(root.get("product"), provideProduct);
  }
}
