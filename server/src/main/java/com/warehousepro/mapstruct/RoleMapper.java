package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.role.CreateRoleRequest;
import com.warehousepro.dto.response.role.RoleRespone;
import com.warehousepro.entity.Role;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoleMapper {
  Role toRole(CreateRoleRequest request);
  RoleRespone toRoleRespone(Role role);
}
