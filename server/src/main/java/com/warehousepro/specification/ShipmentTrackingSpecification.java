package com.warehousepro.specification;


import com.warehousepro.dto.request.shipment.ListShipmentTracking;
import com.warehousepro.entity.ShipmentTracking;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Order;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class ShipmentTrackingSpecification {

  public Specification<ShipmentTracking> hasEventDate(Date eventDate) {
    return (root, query, criteriaBuilder) ->
      eventDate != null
        ? criteriaBuilder.equal(root.get("eventDate"), eventDate)
        : criteriaBuilder.conjunction();
  }

  public Specification<ShipmentTracking> hasTrackingEvent(String trackingEvent) {
    return (root, query, criteriaBuilder) ->
      StringUtils.hasText(trackingEvent)
        ? criteriaBuilder.like(
        criteriaBuilder.lower(root.get("trackingEvent")),
        "%" + trackingEvent.toLowerCase() + "%")
        : criteriaBuilder.conjunction();
  }

  public Specification<ShipmentTracking> hasLocation(String location) {
    return (root, query, criteriaBuilder) ->
      StringUtils.hasText(location)
        ? criteriaBuilder.like(
        criteriaBuilder.lower(root.get("location")),
        "%" + location.toLowerCase() + "%")
        : criteriaBuilder.conjunction();
  }

  public Specification<ShipmentTracking> hasStatus(String status) {
    return (root, query, criteriaBuilder) ->
      StringUtils.hasText(status)
        ? criteriaBuilder.like(
        criteriaBuilder.lower(root.get("status")),
        "%" + status.toLowerCase() + "%")
        : criteriaBuilder.conjunction();
  }

  public Specification<ShipmentTracking> hasShipment(String shipmentId) {
    return (root, query, criteriaBuilder) ->
      StringUtils.hasText(shipmentId)
        ? criteriaBuilder.equal(root.get("shipment").get("id"), shipmentId)
        : criteriaBuilder.conjunction();
  }

  public Specification<ShipmentTracking> getFilterSpecification(ListShipmentTracking filterRequest) {
    return (root, query, criteriaBuilder) -> {
      List<Predicate> predicates = new ArrayList<>();

      // Filter by eventDate
      if (filterRequest.getEventDate() != null) {
        predicates.add(
          criteriaBuilder.equal(root.get("eventDate"), filterRequest.getEventDate()));
      }

      // Filter by trackingEvent
      if (StringUtils.hasText(filterRequest.getTrackingEvent())) {
        predicates.add(
          criteriaBuilder.like(
            criteriaBuilder.lower(root.get("trackingEvent")),
            "%" + filterRequest.getTrackingEvent().toLowerCase() + "%"));
      }

      // Filter by location
      if (StringUtils.hasText(filterRequest.getLocation())) {
        predicates.add(
          criteriaBuilder.like(
            criteriaBuilder.lower(root.get("location")),
            "%" + filterRequest.getLocation().toLowerCase() + "%"));
      }

      // Filter by status
      if (StringUtils.hasText(filterRequest.getStatus())) {
        predicates.add(
          criteriaBuilder.like(
            criteriaBuilder.lower(root.get("status")),
            "%" + filterRequest.getStatus().toLowerCase() + "%"));
      }

      // Filter by shipment
      if (filterRequest.getShipment() != null && StringUtils.hasText(filterRequest.getShipment().getId())) {
        predicates.add(
          criteriaBuilder.equal(root.get("shipment").get("id"), filterRequest.getShipment().getId()));
      }

      // Filter by query (search in multiple fields)
      if (StringUtils.hasText(filterRequest.getQuery())) {
        String queryParam = "%" + filterRequest.getQuery().toLowerCase() + "%";
        Predicate trackingEventPredicate =
          criteriaBuilder.like(criteriaBuilder.lower(root.get("trackingEvent")), queryParam);
        Predicate locationPredicate =
          criteriaBuilder.like(criteriaBuilder.lower(root.get("location")), queryParam);
        Predicate statusPredicate =
          criteriaBuilder.like(criteriaBuilder.lower(root.get("status")), queryParam);
        predicates.add(
          criteriaBuilder.or(trackingEventPredicate, locationPredicate, statusPredicate));
      }

      // Sorting
      if (StringUtils.hasText(filterRequest.getSort())) {
        String[] sortParams = filterRequest.getSort().split(",");
        List<Order> orders = new ArrayList<>();

        for (String sortParam : sortParams) {
          String[] sortFieldAndDirection = sortParam.split(":");
          String sortField = sortFieldAndDirection[0];
          boolean isDesc = sortFieldAndDirection.length > 1 && "desc".equalsIgnoreCase(sortFieldAndDirection[1]);

          switch (sortField) {
            case "eventDate":
            case "trackingEvent":
            case "location":
            case "status":
              orders.add(
                isDesc
                  ? criteriaBuilder.desc(root.get(sortField))
                  : criteriaBuilder.asc(root.get(sortField)));
              break;
            default:
              // Ignore invalid fields
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
