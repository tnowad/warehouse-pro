package com.warehousepro.specification;

import com.warehousepro.entity.Order;
import org.springframework.stereotype.Component;
import com.warehousepro.dto.request.order.ListOrderRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
@Component
public class OrderSpecification {
  public Specification<Order> hasStatus(String status) {
    return (root, query, criteriaBuilder) ->
      StringUtils.hasText(status) ?
        criteriaBuilder.equal(root.get("status"), status) :
        criteriaBuilder.conjunction();
  }

  // Filter by totalAmount
  public Specification<Order> hasTotalAmount(Double totalAmount) {
    return (root, query, criteriaBuilder) ->
      totalAmount != null ?
        criteriaBuilder.equal(root.get("totalAmount"), totalAmount) :
        criteriaBuilder.conjunction();
  }

  // Filter by paymentStatus
  public Specification<Order> hasPaymentStatus(String paymentStatus) {
    return (root, query, criteriaBuilder) ->
      StringUtils.hasText(paymentStatus) ?
        criteriaBuilder.equal(root.get("paymentStatus"), paymentStatus) :
        criteriaBuilder.conjunction();
  }

  // Filter by shippingAddress
  public Specification<Order> hasShippingAddress(String shippingAddress) {
    return (root, query, criteriaBuilder) ->
      StringUtils.hasText(shippingAddress) ?
        criteriaBuilder.like(criteriaBuilder.lower(root.get("shippingAddress")), "%" + shippingAddress.toLowerCase() + "%") :
        criteriaBuilder.conjunction();
  }

  // Combine all filters into one Specification
  public Specification<Order> getFilterSpecification(ListOrderRequest filterRequest) {
    return (root, query, criteriaBuilder) -> {
      List<Predicate> predicates = new ArrayList<>();

      // Apply filters based on the request fields
      if (StringUtils.hasText(filterRequest.getStatus())) {
        predicates.add(hasStatus(filterRequest.getStatus()).toPredicate(root, query, criteriaBuilder));
      }

      if (filterRequest.getTotalAmount() != null) {
        predicates.add(hasTotalAmount(filterRequest.getTotalAmount()).toPredicate(root, query, criteriaBuilder));
      }

      if (StringUtils.hasText(filterRequest.getPaymentStatus())) {
        predicates.add(hasPaymentStatus(filterRequest.getPaymentStatus()).toPredicate(root, query, criteriaBuilder));
      }

      if (StringUtils.hasText(filterRequest.getShippingAddress())) {
        predicates.add(hasShippingAddress(filterRequest.getShippingAddress()).toPredicate(root, query, criteriaBuilder));
      }

      // Handle sorting if needed
      if (filterRequest.getSort() != null && !filterRequest.getSort().isEmpty()) {
        String[] sortParams = filterRequest.getSort().split(",");
        List<jakarta.persistence.criteria.Order> orders = new ArrayList<>();

        for (String sortParam : sortParams) {
          String[] sortFieldAndDirection = sortParam.split(":");
          String sortField = sortFieldAndDirection[0];

          switch (sortField) {
            case "status":
            case "paymentStatus":
            case "totalAmount":
            case "shippingAddress":
              // Default to ascending if not specified
              org.springframework.data.domain.Sort.Direction sortDirection =
                (sortFieldAndDirection.length > 1 && "desc".equalsIgnoreCase(sortFieldAndDirection[1])) ?
                  org.springframework.data.domain.Sort.Direction.DESC :
                  org.springframework.data.domain.Sort.Direction.ASC;

              orders.add(
                sortDirection == org.springframework.data.domain.Sort.Direction.ASC
                  ? criteriaBuilder.asc(root.get(sortField))
                  : criteriaBuilder.desc(root.get(sortField))
              );
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
