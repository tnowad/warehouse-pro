package com.warehousepro.specification;

import com.warehousepro.dto.request.permission.ListPermissionRequest;
import com.warehousepro.entity.Permission;
import org.springframework.data.jpa.domain.Specification;

public interface PermissionSpecification {
  public Specification<Permission> getFilterSpecification(ListPermissionRequest filterRequest);
}
