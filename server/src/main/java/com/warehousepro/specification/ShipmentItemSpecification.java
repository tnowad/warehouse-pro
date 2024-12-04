package com.warehousepro.specification;

import com.warehousepro.dto.request.shipment.ListShipmentItemRequest;
import com.warehousepro.entity.ShipmentItem;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

@Component
public class ShipmentItemSpecification {

  // Filter by orderItemId
  public Specification<ShipmentItem> hasOrderItemId(String orderItemId) {
    return (root, query, criteriaBuilder) ->
      StringUtils.hasText(orderItemId)
        ? criteriaBuilder.equal(root.get("orderItemId"), orderItemId)
        : criteriaBuilder.conjunction();
  }

  // Filter by shipmentId
  public Specification<ShipmentItem> hasShipmentId(String shipmentId) {
    return (root, query, criteriaBuilder) ->
      StringUtils.hasText(shipmentId)
        ? criteriaBuilder.equal(root.get("shipmentId"), shipmentId)
        : criteriaBuilder.conjunction();
  }

  // Combine all filters into a single Specification
  public Specification<ShipmentItem> getFilterSpecification(ListShipmentItemRequest request) {
    return (root, query, criteriaBuilder) -> {
      List<Predicate> predicates = new ArrayList<>();

      // Filter by orderItemId
      if (StringUtils.hasText(request.getOrderItemId())) {
        predicates.add(
          criteriaBuilder.equal(root.get("orderItemId"), request.getOrderItemId())
        );
      }

      // Filter by shipmentId
      if (StringUtils.hasText(request.getShipmentId())) {
        predicates.add(
          criteriaBuilder.equal(root.get("shipmentId"), request.getShipmentId())
        );
      }

      // Combine predicates with AND
      return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    };
  }
}
