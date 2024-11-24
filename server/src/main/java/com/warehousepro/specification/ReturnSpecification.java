package com.warehousepro.specification;

import com.warehousepro.dto.request.returns.ListReturnRequest;
import com.warehousepro.entity.Return;
import jakarta.persistence.criteria.Order;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.data.domain.Sort;

@Component
public class ReturnSpecification {
  public Specification<Return> hasReturnDate(Date returnDate) {
    return (root, query, criteriaBuilder) ->
      returnDate != null
        ? criteriaBuilder.equal(root.get("returnDate"), returnDate)
        : criteriaBuilder.conjunction();
  }

  public Specification<Return> hasReason(String reason) {
    return (root, query, criteriaBuilder) ->
      StringUtils.hasText(reason)
        ? criteriaBuilder.like(criteriaBuilder.lower(root.get("reason")), "%" + reason.toLowerCase() + "%")
        : criteriaBuilder.conjunction();
  }

  public Specification<Return> hasStatus(String status) {
    return (root, query, criteriaBuilder) ->
      StringUtils.hasText(status)
        ? criteriaBuilder.like(criteriaBuilder.lower(root.get("status")), "%" + status.toLowerCase() + "%")
        : criteriaBuilder.conjunction();
  }

  public Specification<Return> getFilterSpecification(ListReturnRequest filterRequest) {
    return (root, query, criteriaBuilder) -> {
      List<Predicate> predicates = new ArrayList<>();

      if (filterRequest.getReturnDate() != null) {
        predicates.add(criteriaBuilder.equal(root.get("returnDate"), filterRequest.getReturnDate()));
      }

      if (StringUtils.hasText(filterRequest.getReason())) {
        predicates.add(
          criteriaBuilder.like(
            criteriaBuilder.lower(root.get("reason")),
            "%" + filterRequest.getReason().toLowerCase() + "%"
          )
        );
      }

      if (StringUtils.hasText(filterRequest.getStatus())) {
        predicates.add(
          criteriaBuilder.like(
            criteriaBuilder.lower(root.get("status")),
            "%" + filterRequest.getStatus().toLowerCase() + "%"
          )
        );
      }

      if (StringUtils.hasText(filterRequest.getQuery())) {
        String queryParam = "%" + filterRequest.getQuery().toLowerCase() + "%";
        Predicate reasonPredicate = criteriaBuilder.like(criteriaBuilder.lower(root.get("reason")), queryParam);
        Predicate statusPredicate = criteriaBuilder.like(criteriaBuilder.lower(root.get("status")), queryParam);
        predicates.add(criteriaBuilder.or(reasonPredicate, statusPredicate));
      }

      if (StringUtils.hasLength(filterRequest.getSort())) {
        String[] sortParams = filterRequest.getSort().split(",");
        List<Order> orders = new ArrayList<>();

        for (String sortParam : sortParams) {
          String[] sortFieldAndDirection = sortParam.split(":");
          String sortField = sortFieldAndDirection[0];

          switch (sortField) {
            case "returnDate":
            case "reason":
            case "status":
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
