package com.warehousepro.specification;

import com.warehousepro.dto.request.procurement.ListProcurementsRequest;
import com.warehousepro.entity.Procurement;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Predicate;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class ProcurementSpecification {

  public Specification<Procurement> getFilterSpecification(ListProcurementsRequest filterRequest) {
    return (root, query, criteriaBuilder) -> {
      List<Predicate> predicates = new ArrayList<>();

      if (filterRequest.getIds() != null && !filterRequest.getIds().isEmpty()) {
        predicates.add(root.get("id").in(filterRequest.getIds()));
      }

      if (filterRequest.getSupplierIds() != null && !filterRequest.getSupplierIds().isEmpty()) {
        predicates.add(root.get("supplierId").in(filterRequest.getSupplierIds()));
      }

      if (StringUtils.hasText(filterRequest.getStatus())) {
        predicates.add(criteriaBuilder.equal(root.get("status"), filterRequest.getStatus()));
      }

      if (StringUtils.hasText(filterRequest.getQuery())) {
        String queryParam = "%" + filterRequest.getQuery().toLowerCase() + "%";
        Predicate idPredicate =
            criteriaBuilder.like(criteriaBuilder.lower(root.get("id")), queryParam);
        Predicate supplierIdPredicate =
            criteriaBuilder.like(criteriaBuilder.lower(root.get("supplierId")), queryParam);
        Predicate statusPredicate =
            criteriaBuilder.like(criteriaBuilder.lower(root.get("status")), queryParam);
        predicates.add(criteriaBuilder.or(idPredicate, supplierIdPredicate, statusPredicate));
      }

      if (filterRequest.getOrderDateFrom() != null) {
        predicates.add(
            criteriaBuilder.greaterThanOrEqualTo(
                root.get("orderDate"), LocalDate.parse(filterRequest.getOrderDateFrom())));
      }

      if (filterRequest.getOrderDateTo() != null) {
        predicates.add(
            criteriaBuilder.lessThanOrEqualTo(
                root.get("orderDate"), LocalDate.parse(filterRequest.getOrderDateTo())));
      }

      if (filterRequest.getDeliveryDateFrom() != null) {
        predicates.add(
            criteriaBuilder.greaterThanOrEqualTo(
                root.get("deliveryDate"), LocalDate.parse(filterRequest.getDeliveryDateFrom())));
      }

      if (filterRequest.getDeliveryDateTo() != null) {
        predicates.add(
            criteriaBuilder.lessThanOrEqualTo(
                root.get("deliveryDate"), LocalDate.parse(filterRequest.getDeliveryDateTo())));
      }

      if (StringUtils.hasLength(filterRequest.getSort())) {
        String[] sortParams = filterRequest.getSort().split(",");
        List<Order> orders = new ArrayList<>();

        for (String sortParam : sortParams) {
          String[] sortFieldAndDirection = sortParam.split(":");
          String sortField = sortFieldAndDirection[0];

          switch (sortField) {
            case "id":
            case "supplierId":
            case "status":
            case "orderDate":
            case "deliveryDate":
            case "createdAt":
            case "totalCost":
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
