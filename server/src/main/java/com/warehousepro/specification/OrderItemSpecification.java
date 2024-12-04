package com.warehousepro.specification;

import com.warehousepro.dto.request.order.ListOrderItemRequest;
import com.warehousepro.entity.OrderItem;
import com.warehousepro.entity.OrderItemStatus;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

@Component
public class OrderItemSpecification {

  // Filter by productId
  public Specification<OrderItem> hasProductId(String productId) {
    return (root, query, criteriaBuilder) ->
      StringUtils.hasText(productId)
        ? criteriaBuilder.equal(root.get("productId"), productId)
        : criteriaBuilder.conjunction();
  }

  // Filter by warehouseId
  public Specification<OrderItem> hasWarehouseId(String warehouseId) {
    return (root, query, criteriaBuilder) ->
      StringUtils.hasText(warehouseId)
        ? criteriaBuilder.equal(root.get("warehouseId"), warehouseId)
        : criteriaBuilder.conjunction();
  }

  // Filter by quantity
  public Specification<OrderItem> hasQuantity(Integer quantity) {
    return (root, query, criteriaBuilder) ->
      quantity != null
        ? criteriaBuilder.equal(root.get("quantity"), quantity)
        : criteriaBuilder.conjunction();
  }

  // Filter by price
  public Specification<OrderItem> hasPrice(Double price) {
    return (root, query, criteriaBuilder) ->
      price != null
        ? criteriaBuilder.equal(root.get("price"), price)
        : criteriaBuilder.conjunction();
  }

  // Filter by discount
  public Specification<OrderItem> hasDiscount(Double discount) {
    return (root, query, criteriaBuilder) ->
      discount != null
        ? criteriaBuilder.equal(root.get("discount"), discount)
        : criteriaBuilder.conjunction();
  }

  // Filter by status
  public Specification<OrderItem> hasStatus(OrderItemStatus status) {
    return (root, query, criteriaBuilder) ->
      status != null
        ? criteriaBuilder.equal(root.get("status"), status)
        : criteriaBuilder.conjunction();
  }

  // Combine all filters into one Specification
  public Specification<OrderItem> getFilterSpecification(ListOrderItemRequest filterRequest) {
    return (root, query, criteriaBuilder) -> {
      List<Predicate> predicates = new ArrayList<>();

      // Apply filters based on the request fields
      if (StringUtils.hasText(filterRequest.getProductId())) {
        predicates.add(
          hasProductId(filterRequest.getProductId()).toPredicate(root, query, criteriaBuilder));
      }

      if (StringUtils.hasText(filterRequest.getWarehouseId())) {
        predicates.add(
          hasWarehouseId(filterRequest.getWarehouseId()).toPredicate(root, query, criteriaBuilder));
      }

      if (filterRequest.getQuantity() != null) {
        predicates.add(
          hasQuantity(filterRequest.getQuantity()).toPredicate(root, query, criteriaBuilder));
      }

      if (filterRequest.getPrice() != null) {
        predicates.add(
          hasPrice(filterRequest.getPrice()).toPredicate(root, query, criteriaBuilder));
      }

      if (filterRequest.getDiscount() != null) {
        predicates.add(
          hasDiscount(filterRequest.getDiscount()).toPredicate(root, query, criteriaBuilder));
      }

      if (filterRequest.getStatus() != null) {
        predicates.add(
          hasStatus(filterRequest.getStatus()).toPredicate(root, query, criteriaBuilder));
      }

      return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    };
  }
}
