package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.permission.CreatePermisionRequest;
import com.warehousepro.dto.response.permission.PermissionResponse;
import com.warehousepro.entity.Permission;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PermissonMapper {
  Permission toPermission(CreatePermisionRequest request);
  PermissionResponse toPermissionResponse(Permission permission);
}
