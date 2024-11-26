package com.warehousepro.specification;

import com.warehousepro.dto.request.permission.ListPermissionRequest;
import com.warehousepro.entity.Permission;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
public class PermissionSpecificationImpl implements PermissionSpecification {
  @Override
  public Specification<Permission> getFilterSpecification(ListPermissionRequest filterRequest) {
    return (root, query, criteriaBuilder) -> {
      List<Predicate> predicates = new ArrayList<>();

      // Apply filters based on the request fields
      if (filterRequest.getName() != null && !filterRequest.getName().isEmpty()) {
        predicates.add(criteriaBuilder.like(root.get("name"), "%" + filterRequest.getName() + "%"));
      }

      if (filterRequest.getDescription() != null && !filterRequest.getDescription().isEmpty()) {
        predicates.add(
            criteriaBuilder.like(
                root.get("description"), "%" + filterRequest.getDescription() + "%"));
      }

      if (filterRequest.getIds() != null && !filterRequest.getIds().isEmpty()) {
        predicates.add(root.get("id").in(filterRequest.getIds()));
      }

      // Handle sorting if needed
      if (filterRequest.getSort() != null && !filterRequest.getSort().isEmpty()) {
        String[] sortParams = filterRequest.getSort().split(",");
        List<jakarta.persistence.criteria.Order> orders = new ArrayList<>();

        for (String sortParam : sortParams) {
          String[] sortFieldAndDirection = sortParam.split(":");
          String sortField = sortFieldAndDirection[0];

          org.springframework.data.domain.Sort.Direction sortDirection =
              (sortFieldAndDirection.length > 1
                      && "desc".equalsIgnoreCase(sortFieldAndDirection[1]))
                  ? org.springframework.data.domain.Sort.Direction.DESC
                  : org.springframework.data.domain.Sort.Direction.ASC;

          if ("name".equals(sortField)) {
            orders.add(
                sortDirection == org.springframework.data.domain.Sort.Direction.ASC
                    ? criteriaBuilder.asc(root.get("name"))
                    : criteriaBuilder.desc(root.get("name")));
          } else if ("description".equals(sortField)) {
            orders.add(
                sortDirection == org.springframework.data.domain.Sort.Direction.ASC
                    ? criteriaBuilder.asc(root.get("description"))
                    : criteriaBuilder.desc(root.get("description")));
          }
          // Add additional fields here if needed
        }

        if (!orders.isEmpty()) {
          query.orderBy(orders);
        }
      }

      return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    };
  }
}
