package com.warehousepro.specification;

import com.warehousepro.dto.request.role.ListRoleRequest;
import com.warehousepro.entity.Role;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class RoleSpecification {
  public Specification<Role> hasName(String name) {
    return (root, query, criteriaBuilder) ->
        StringUtils.hasText(name)
            ? criteriaBuilder.like(
                criteriaBuilder.lower(root.get("name")), "%" + name.toLowerCase() + "%")
            : criteriaBuilder.conjunction();
  }

  public Specification<Role> hasDescription(String description) {
    return (root, query, criteriaBuilder) ->
        StringUtils.hasText(description)
            ? criteriaBuilder.like(
                criteriaBuilder.lower(root.get("description")),
                "%" + description.toLowerCase() + "%")
            : criteriaBuilder.conjunction();
  }

  public Specification<Role> getFilterSpecification(ListRoleRequest filterRequest) {
    return (root, query, criteriaBuilder) -> {
      List<Predicate> predicates = new ArrayList<>();

      // Kiểm tra filter theo tên
      if (StringUtils.hasText(filterRequest.getName())) {
        predicates.add(
            criteriaBuilder.like(
                criteriaBuilder.lower(root.get("name")),
                "%" + filterRequest.getName().toLowerCase() + "%"));
      }

      // Kiểm tra filter theo mô tả
      if (StringUtils.hasText(filterRequest.getDescription())) {
        predicates.add(
            criteriaBuilder.like(
                criteriaBuilder.lower(root.get("description")),
                "%" + filterRequest.getDescription().toLowerCase() + "%"));
      }

      // Kiểm tra query tổng hợp
      if (StringUtils.hasText(filterRequest.getQuery())) {
        String queryParam = "%" + filterRequest.getQuery().toLowerCase() + "%";
        Predicate namePredicate =
            criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), queryParam);
        Predicate descriptionPredicate =
            criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), queryParam);
        predicates.add(criteriaBuilder.or(namePredicate, descriptionPredicate));
      }

      // Kiểm tra sort
      if (StringUtils.hasLength(filterRequest.getSort())) {
        String[] sortParams = filterRequest.getSort().split(",");
        List<Order> orders = new ArrayList<>();

        for (String sortParam : sortParams) {
          String[] sortFieldAndDirection = sortParam.split(":");
          String sortField = sortFieldAndDirection[0];

          switch (sortField) {
            case "name":
            case "description":
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
