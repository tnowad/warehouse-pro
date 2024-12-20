package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.role.CreateRoleRequest;
import com.warehousepro.dto.response.role.GetUserRolesItemResponse;
import com.warehousepro.dto.response.role.RoleResponse;
import com.warehousepro.entity.Role;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoleMapper {
  Role toRole(CreateRoleRequest request);

  Role toRole(RoleResponse response);

  RoleResponse toRoleResponse(Role role);

  GetUserRolesItemResponse toItem(Role role);
}
