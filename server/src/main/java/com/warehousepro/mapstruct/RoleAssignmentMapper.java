package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.role.CreateRoleAssignmentRequest;
import com.warehousepro.dto.response.role.RoleAssignmentResponse;
import com.warehousepro.entity.RoleAssignment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoleAssignmentMapper {
  RoleAssignment toRoleAssignment(CreateRoleAssignmentRequest request);
  RoleAssignmentResponse toRoleAssignmentResponse(RoleAssignment roleAssignment);
}
