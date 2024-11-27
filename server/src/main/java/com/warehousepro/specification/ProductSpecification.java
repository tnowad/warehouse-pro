package com.warehousepro.specification;

import com.warehousepro.dto.request.product.ListProductRequest;
import com.warehousepro.entity.Product;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class ProductSpecification {

  public Specification<Product> containName(String providedName) {
    return (root, query, criteriaBuilder) ->
        criteriaBuilder.like(
            criteriaBuilder.lower(root.get("name")), "%" + providedName.toLowerCase() + "%");
  }

  public Specification<Product> containDesc(String providedDesc) {
    return (root, query, criteriaBuilder) ->
        criteriaBuilder.like(
            criteriaBuilder.lower(root.get("description")), "%" + providedDesc.toLowerCase() + "%");
  }

  public Specification<Product> containSku(String providedSku) {
    return (root, query, criteriaBuilder) ->
        criteriaBuilder.like(
            criteriaBuilder.lower(root.get("sku")), "%" + providedSku.toLowerCase() + "%");
  }

  public Specification<Product> hasPrice(String providedPrice) {
    return (root, query, criteriaBuilder) ->
        criteriaBuilder.equal(root.get("price"), providedPrice);
  }

  public Specification<Product> getFilterSpecification(ListProductRequest filterRequest) {
    return (root, query, criteriaBuilder) -> {
      List<Predicate> predicates = new ArrayList<>();

      // Apply filters based on the request fields
      if (StringUtils.hasText(filterRequest.getName())) {
        predicates.add(
            criteriaBuilder.like(
                criteriaBuilder.lower(root.get("name")),
                "%" + filterRequest.getName().toLowerCase() + "%"));
      }

      if (filterRequest.getIds() != null && !filterRequest.getIds().isEmpty()) {
        predicates.add(root.get("id").in(filterRequest.getIds()));
      }

      // Handle sorting if specified
      if (filterRequest.getSort() != null && !filterRequest.getSort().isEmpty()) {
        String[] sortParams = filterRequest.getSort().split(",");
        List<jakarta.persistence.criteria.Order> orders = new ArrayList<>();

        for (String sortParam : sortParams) {
          String[] sortFieldAndDirection = sortParam.split(":");
          String sortField = sortFieldAndDirection[0];

          // Supported fields for sorting
          switch (sortField) {
            case "name":
              org.springframework.data.domain.Sort.Direction sortDirection =
                  (sortFieldAndDirection.length > 1
                          && "desc".equalsIgnoreCase(sortFieldAndDirection[1]))
                      ? org.springframework.data.domain.Sort.Direction.DESC
                      : org.springframework.data.domain.Sort.Direction.ASC;

              orders.add(
                  sortDirection == org.springframework.data.domain.Sort.Direction.ASC
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
