package com.warehousepro.specification;

import com.warehousepro.dto.request.shipment.ListShipmentRequest;
import com.warehousepro.entity.Shipment;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class ShippmentSpecification {
  public Specification<Shipment> hasShipmentDate(Date shipmentDate) {
    return (root, query, criteriaBuilder) ->
        shipmentDate != null
            ? criteriaBuilder.equal(root.get("shipmentDate"), shipmentDate)
            : criteriaBuilder.conjunction();
  }

  public Specification<Shipment> hasStatus(String status) {
    return (root, query, criteriaBuilder) ->
        StringUtils.hasText(status)
            ? criteriaBuilder.like(
                criteriaBuilder.lower(root.get("status")), "%" + status.toLowerCase() + "%")
            : criteriaBuilder.conjunction();
  }

  public Specification<Shipment> hasTrackingNumber(String trackingNumber) {
    return (root, query, criteriaBuilder) ->
        StringUtils.hasText(trackingNumber)
            ? criteriaBuilder.like(
                criteriaBuilder.lower(root.get("trackingNumber")),
                "%" + trackingNumber.toLowerCase() + "%")
            : criteriaBuilder.conjunction();
  }

  public Specification<Shipment> hasShippingMethod(String shippingMethod) {
    return (root, query, criteriaBuilder) ->
        StringUtils.hasText(shippingMethod)
            ? criteriaBuilder.like(
                criteriaBuilder.lower(root.get("shippingMethod")),
                "%" + shippingMethod.toLowerCase() + "%")
            : criteriaBuilder.conjunction();
  }

  public Specification<Shipment> hasDeliveryEstimate(Date deliveryEstimate) {
    return (root, query, criteriaBuilder) ->
        deliveryEstimate != null
            ? criteriaBuilder.equal(root.get("deliveryEstimate"), deliveryEstimate)
            : criteriaBuilder.conjunction();
  }

  public Specification<Shipment> hasCarrier(String carrier) {
    return (root, query, criteriaBuilder) ->
        StringUtils.hasText(carrier)
            ? criteriaBuilder.like(
                criteriaBuilder.lower(root.get("carrier")), "%" + carrier.toLowerCase() + "%")
            : criteriaBuilder.conjunction();
  }

  public Specification<Shipment> getFilterSpecification(ListShipmentRequest filterRequest) {
    return (root, query, criteriaBuilder) -> {
      List<Predicate> predicates = new ArrayList<>();

      if (filterRequest.getShipmentDate() != null) {
        predicates.add(
            criteriaBuilder.equal(root.get("shipmentDate"), filterRequest.getShipmentDate()));
      }

      if (StringUtils.hasText(filterRequest.getStatus())) {
        predicates.add(
            criteriaBuilder.like(
                criteriaBuilder.lower(root.get("status")),
                "%" + filterRequest.getStatus().toLowerCase() + "%"));
      }

      if (StringUtils.hasText(filterRequest.getTrackingNumber())) {
        predicates.add(
            criteriaBuilder.like(
                criteriaBuilder.lower(root.get("trackingNumber")),
                "%" + filterRequest.getTrackingNumber().toLowerCase() + "%"));
      }

      if (StringUtils.hasText(filterRequest.getShippingMethod())) {
        predicates.add(
            criteriaBuilder.like(
                criteriaBuilder.lower(root.get("shippingMethod")),
                "%" + filterRequest.getShippingMethod().toLowerCase() + "%"));
      }

      if (filterRequest.getDeliveryEstimate() != null) {
        predicates.add(
            criteriaBuilder.equal(
                root.get("deliveryEstimate"), filterRequest.getDeliveryEstimate()));
      }

      if (StringUtils.hasText(filterRequest.getCarrier())) {
        predicates.add(
            criteriaBuilder.like(
                criteriaBuilder.lower(root.get("carrier")),
                "%" + filterRequest.getCarrier().toLowerCase() + "%"));
      }

      if (StringUtils.hasText(filterRequest.getQuery())) {
        String queryParam = "%" + filterRequest.getQuery().toLowerCase() + "%";
        Predicate statusPredicate =
            criteriaBuilder.like(criteriaBuilder.lower(root.get("status")), queryParam);
        Predicate trackingNumberPredicate =
            criteriaBuilder.like(criteriaBuilder.lower(root.get("trackingNumber")), queryParam);
        Predicate carrierPredicate =
            criteriaBuilder.like(criteriaBuilder.lower(root.get("carrier")), queryParam);
        predicates.add(
            criteriaBuilder.or(statusPredicate, trackingNumberPredicate, carrierPredicate));
      }

      if (StringUtils.hasLength(filterRequest.getSort())) {
        String[] sortParams = filterRequest.getSort().split(",");
        List<Order> orders = new ArrayList<>();

        for (String sortParam : sortParams) {
          String[] sortFieldAndDirection = sortParam.split(":");
          String sortField = sortFieldAndDirection[0];

          switch (sortField) {
            case "shipmentDate":
            case "status":
            case "trackingNumber":
            case "shippingMethod":
            case "deliveryEstimate":
            case "carrier":
              Sort.Direction sortDirection =
                  (sortFieldAndDirection.length > 1
                          && "desc".equalsIgnoreCase(sortFieldAndDirection[1]))
                      ? Sort.Direction.DESC
                      : Sort.Direction.ASC;

              orders.add(
                  sortDirection == Sort.Direction.ASC
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
