package com.warehousepro.specification;

import com.warehousepro.dto.request.user.ListUserRequest;
import com.warehousepro.entity.User;

import jakarta.persistence.criteria.Order;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import jakarta.persistence.criteria.Predicate;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.domain.Sort;

@Component
public class UserSpecification {
  public Specification<User> hasEmail(String email) {
    return (root, query, criteriaBuilder) ->
      StringUtils.hasText(email)
        ? criteriaBuilder.like(criteriaBuilder.lower(root.get("email")), "%" + email.toLowerCase() + "%")
        : criteriaBuilder.conjunction();
  }

  public Specification<User> hasName(String name) {
    return (root, query, criteriaBuilder) ->
      StringUtils.hasText(name)
        ? criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + name.toLowerCase() + "%")
        : criteriaBuilder.conjunction();
  }

  public Specification<User> createdAtEquals(LocalDate createdAt) {
    return (root, query, criteriaBuilder) ->
      createdAt != null
        ? criteriaBuilder.equal(root.get("createdAt"), createdAt)
        : criteriaBuilder.conjunction();
  }

  public Specification<User> updatedAtEquals(LocalDate updatedAt) {
    return (root, query, criteriaBuilder) ->
      updatedAt != null
        ? criteriaBuilder.equal(root.get("updatedAt"), updatedAt)
        : criteriaBuilder.conjunction();
  }

  public Specification<User> getFilterSpecification(ListUserRequest filterRequest) {
    return (root, query, criteriaBuilder) -> {
      List<Predicate> predicates = new ArrayList<>();

      if (filterRequest.getIds() != null && !filterRequest.getIds().isEmpty()) {
        predicates.add(root.get("id").in(filterRequest.getIds()));
      }

      if (StringUtils.hasText(filterRequest.getEmail())) {
        predicates.add(
          criteriaBuilder.like(
            criteriaBuilder.lower(root.get("email")),
            "%" + filterRequest.getEmail().toLowerCase() + "%"
          )
        );
      }

      if (StringUtils.hasText(filterRequest.getName())) {
        predicates.add(
          criteriaBuilder.like(
            criteriaBuilder.lower(root.get("name")),
            "%" + filterRequest.getName().toLowerCase() + "%"
          )
        );
      }

      if (filterRequest.getCreatedAt() != null) {
        predicates.add(criteriaBuilder.equal(root.get("createdAt"), filterRequest.getCreatedAt()));
      }

      if (filterRequest.getUpdatedAt() != null) {
        predicates.add(criteriaBuilder.equal(root.get("updatedAt"), filterRequest.getUpdatedAt()));
      }

      if (StringUtils.hasText(filterRequest.getQuery())) {
        String queryParam = "%" + filterRequest.getQuery().toLowerCase() + "%";
        Predicate emailPredicate = criteriaBuilder.like(criteriaBuilder.lower(root.get("email")), queryParam);
        Predicate namePredicate = criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), queryParam);
        predicates.add(criteriaBuilder.or(emailPredicate, namePredicate));
      }

      if (StringUtils.hasLength(filterRequest.getSort())) {
        String[] sortParams = filterRequest.getSort().split(",");
        List<Order> orders = new ArrayList<>();

        for (String sortParam : sortParams) {
          String[] sortFieldAndDirection = sortParam.split(":");
          String sortField = sortFieldAndDirection[0];

          switch (sortField) {
            case "email":
            case "name":
            case "createdAt":
            case "updatedAt":
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
