package com.warehousepro.specification;

import com.warehousepro.dto.request.supplierproduct.ListSupplierProductRequest;
import com.warehousepro.entity.Product;
import com.warehousepro.entity.Supplier;
import com.warehousepro.entity.SupplierProduct;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class SupplierProductSpecification {

  // Filter by leadTimeDays
  public Specification<SupplierProduct> hasLeadTimeDays(Integer leadTimeDays) {
    return (root, query, criteriaBuilder) ->
        leadTimeDays != null
            ? criteriaBuilder.equal(root.get("leadTimeDays"), leadTimeDays)
            : criteriaBuilder.conjunction();
  }

  // Filter by price
  public Specification<SupplierProduct> hasPrice(Double price) {
    return (root, query, criteriaBuilder) ->
        price != null
            ? criteriaBuilder.equal(root.get("price"), price)
            : criteriaBuilder.conjunction();
  }

  // Filter by availabilityStatus
  public Specification<SupplierProduct> hasAvailabilityStatus(String availabilityStatus) {
    return (root, query, criteriaBuilder) ->
        StringUtils.hasText(availabilityStatus)
            ? criteriaBuilder.equal(root.get("availabilityStatus"), availabilityStatus)
            : criteriaBuilder.conjunction();
  }

  // Filter by supplierIds
  public Specification<SupplierProduct> hasSupplierIds(List<String> supplierIds) {
    return (root, query, criteriaBuilder) ->
        supplierIds != null && !supplierIds.isEmpty()
            ? root.get("supplier").get("id").in(supplierIds)
            : criteriaBuilder.conjunction();
  }

  // Filter by supplierNames
  public static Specification<SupplierProduct> hasSupplierName(String supplierName) {
    return (root, query, criteriaBuilder) -> {
      if (supplierName != null && !supplierName.isEmpty()) {
        Join<SupplierProduct, Supplier> supplierJoin = root.join("supplier");
        return supplierJoin.get("name").in(supplierName);
      }
      return criteriaBuilder.conjunction();
    };
  }

  // Filter by productIds
  public Specification<SupplierProduct> hasProductIds(List<String> productIds) {
    return (root, query, criteriaBuilder) ->
        productIds != null && !productIds.isEmpty()
            ? root.get("product").get("id").in(productIds)
            : criteriaBuilder.conjunction();
  }

  // Filter by productNames
  public static Specification<SupplierProduct> hasProductName(String productName) {
    return (root, query, criteriaBuilder) -> {
      if (productName != null && !productName.isEmpty()) {
        Join<SupplierProduct, Product> productJoin = root.join("product");
        return productJoin.get("name").in(productName);
      }
      return criteriaBuilder.conjunction();
    };
  }

  // Combine all filters into one Specification
  public Specification<SupplierProduct> getFilterSpecification(
      ListSupplierProductRequest filterRequest) {
    return (root, query, criteriaBuilder) -> {
      List<Predicate> predicates = new ArrayList<>();

      // Apply filters based on the request fields
      if (filterRequest.getLeadTimeDays() != null) {
        predicates.add(
            hasLeadTimeDays(filterRequest.getLeadTimeDays())
                .toPredicate(root, query, criteriaBuilder));
      }

      if (filterRequest.getPrice() != null) {
        predicates.add(
            hasPrice(filterRequest.getPrice()).toPredicate(root, query, criteriaBuilder));
      }

      if (StringUtils.hasText(filterRequest.getAvailabilityStatus())) {
        predicates.add(
            hasAvailabilityStatus(filterRequest.getAvailabilityStatus())
                .toPredicate(root, query, criteriaBuilder));
      }

      // Apply filters for supplierIds
      if (filterRequest.getSupplierIds() != null && !filterRequest.getSupplierIds().isEmpty()) {
        predicates.add(
            hasSupplierIds(filterRequest.getSupplierIds())
                .toPredicate(root, query, criteriaBuilder));
      }

      // Apply filters for supplierNames
      if (filterRequest.getSupplierName() != null && !filterRequest.getSupplierName().isEmpty()) {
        predicates.add(
            hasSupplierName(filterRequest.getSupplierName())
                .toPredicate(root, query, criteriaBuilder));
      }

      // Apply filters for productIds
      if (filterRequest.getProductIds() != null && !filterRequest.getProductIds().isEmpty()) {
        predicates.add(
            hasProductIds(filterRequest.getProductIds()).toPredicate(root, query, criteriaBuilder));
      }

      // Apply filters for productNames
      if (filterRequest.getProductName() != null && !filterRequest.getProductName().isEmpty()) {
        predicates.add(
            hasProductName(filterRequest.getProductName())
                .toPredicate(root, query, criteriaBuilder));
      }

      // Handle sorting if needed
      if (filterRequest.getSort() != null && !filterRequest.getSort().isEmpty()) {
        String[] sortParams = filterRequest.getSort().split(",");
        List<Order> orders = new ArrayList<>();

        for (String sortParam : sortParams) {
          String[] sortFieldAndDirection = sortParam.split(":");
          String sortField = sortFieldAndDirection[0];

          switch (sortField) {
            case "leadTimeDays":
            case "price":
            case "availabilityStatus":
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
