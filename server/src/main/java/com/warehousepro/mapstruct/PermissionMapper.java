package com.warehousepro.mapstruct;

import com.warehousepro.dto.response.permission.PermissionResponse;
import com.warehousepro.entity.Permission;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
  PermissionResponse toPermissionResponse(Permission permission);
}
