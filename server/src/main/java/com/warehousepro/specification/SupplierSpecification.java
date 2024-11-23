package com.warehousepro.specification;

import com.warehousepro.dto.request.supplier.ListSupplierRequest;
import com.warehousepro.entity.Supplier;
import jakarta.persistence.criteria.Order;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.domain.Sort;

@Component
public class SupplierSpecification {

  public Specification<Supplier> hasName(String name) {
    return (root, query, criteriaBuilder) ->
      StringUtils.hasText(name)
        ? criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + name.toLowerCase() + "%")
        : criteriaBuilder.conjunction();
  }

  public Specification<Supplier> hasContact(String contact) {
    return (root, query, criteriaBuilder) ->
      StringUtils.hasText(contact)
        ? criteriaBuilder.like(criteriaBuilder.lower(root.get("contact")), "%" + contact.toLowerCase() + "%")
        : criteriaBuilder.conjunction();
  }

  public Specification<Supplier> hasAddress(String address) {
    return (root, query, criteriaBuilder) ->
      StringUtils.hasText(address)
        ? criteriaBuilder.like(criteriaBuilder.lower(root.get("address")), "%" + address.toLowerCase() + "%")
        : criteriaBuilder.conjunction();
  }

  public Specification<Supplier> createdAtEquals(String createdAt) {
    return (root, query, criteriaBuilder) ->
      StringUtils.hasText(createdAt)
        ? criteriaBuilder.equal(root.get("createdAt"), createdAt)
        : criteriaBuilder.conjunction();
  }

  public Specification<Supplier> updatedAtEquals(String updatedAt) {
    return (root, query, criteriaBuilder) ->
      StringUtils.hasText(updatedAt)
        ? criteriaBuilder.equal(root.get("updatedAt"), updatedAt)
        : criteriaBuilder.conjunction();
  }

  public Specification<Supplier> getFilterSpecification(ListSupplierRequest filterRequest) {
    return (root, query, criteriaBuilder) -> {
      List<Predicate> predicates = new ArrayList<>();

      if (StringUtils.hasText(filterRequest.getName())) {
        predicates.add(
          criteriaBuilder.like(
            criteriaBuilder.lower(root.get("name")),
            "%" + filterRequest.getName().toLowerCase() + "%"
          )
        );
      }

      if (StringUtils.hasText(filterRequest.getContact())) {
        predicates.add(
          criteriaBuilder.like(
            criteriaBuilder.lower(root.get("contact")),
            "%" + filterRequest.getContact().toLowerCase() + "%"
          )
        );
      }

      if (StringUtils.hasText(filterRequest.getAddress())) {
        predicates.add(
          criteriaBuilder.like(
            criteriaBuilder.lower(root.get("address")),
            "%" + filterRequest.getAddress().toLowerCase() + "%"
          )
        );
      }

      if (StringUtils.hasText(filterRequest.getCreatedAt())) {
        predicates.add(criteriaBuilder.equal(root.get("createdAt"), filterRequest.getCreatedAt()));
      }

      if (StringUtils.hasText(filterRequest.getUpdatedAt())) {
        predicates.add(criteriaBuilder.equal(root.get("updatedAt"), filterRequest.getUpdatedAt()));
      }

      if (StringUtils.hasText(filterRequest.getQuery())) {
        String queryParam = "%" + filterRequest.getQuery().toLowerCase() + "%";
        Predicate namePredicate = criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), queryParam);
        Predicate contactPredicate = criteriaBuilder.like(criteriaBuilder.lower(root.get("contact")), queryParam);
        Predicate addressPredicate = criteriaBuilder.like(criteriaBuilder.lower(root.get("address")), queryParam);
        predicates.add(criteriaBuilder.or(namePredicate, contactPredicate, addressPredicate));
      }

      if (StringUtils.hasLength(filterRequest.getSort())) {
        String[] sortParams = filterRequest.getSort().split(",");
        List<Order> orders = new ArrayList<>();

        for (String sortParam : sortParams) {
          String[] sortFieldAndDirection = sortParam.split(":");
          String sortField = sortFieldAndDirection[0];

          switch (sortField) {
            case "name":
            case "contact":
            case "address":
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

