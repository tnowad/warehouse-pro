package com.warehousepro.specification;

import com.warehousepro.entity.Product;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
public class ProductSpecification {

  public Specification<Product> containName(String providedName) {
    return (root, query, criteriaBuilder) -> criteriaBuilder
        .like(criteriaBuilder.lower(root.get("name")), "%" + providedName.toLowerCase() + "%");
  }

  public Specification<Product> containDesc(String providedDesc) {
    return (root, query, criteriaBuilder) -> criteriaBuilder.like(
        criteriaBuilder.lower(root.get("description")), "%" + providedDesc.toLowerCase() + "%");
  }

  public Specification<Product> containSku(String providedSku) {
    return (root, query, criteriaBuilder) -> criteriaBuilder
        .like(criteriaBuilder.lower(root.get("sku")), "%" + providedSku.toLowerCase() + "%");
  }

  public Specification<Product> hasPrice(String providedPrice) {
    return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("price"),
        providedPrice);
  }
}
