package com.warehousepro.service;

import com.warehousepro.dto.request.permission.CreatePermisionRequest;
import com.warehousepro.entity.Permission;
import com.warehousepro.entity.Role;
import com.warehousepro.mapstruct.PermissonMapper;
import com.warehousepro.repository.PermissionRepository;
import com.warehousepro.repository.RoleRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class PermissionService {
  PermissionRepository permissionRepository;
  PermissonMapper permissonMapper;
  RoleRepository roleRepository;

  public Permission create(CreatePermisionRequest request) {
    Permission permission = permissonMapper.toPermission(request);
    return permissionRepository.save(permission);
  }

  public Permission assignRoleToPermission(String perId, String roleId) {
    Permission permission =
        permissionRepository
            .findById(perId)
            .orElseThrow(() -> new EntityNotFoundException("Per not found"));
    Role role =
        roleRepository
            .findById(roleId)
            .orElseThrow(() -> new EntityNotFoundException("Role not found"));
    permission.addRole(role);
    return permissionRepository.save(permission);
  }
  @PreAuthorize("hasAnyAuthority('DASHBOARD_VIEW' , 'SETTING_VIEW')")
 public List<String> general(){
    return List.of(
      "DASHBOARD_VIEW",
      "SETTINGS_VIEW");
 }

 @PreAuthorize("hasAnyAuthority( 'USER_ROLE_ASSIGN' , 'USER_DELETE'," +
   " 'USER_REGISTER', 'USER_DETAILS_VIEW', 'USER_ROLES_VIEW' ," +
   " 'USER_UPDATE', 'USER_CURRENT_PERMISSIONS_VIEW' , 'USER_CURRENT_ROLES_VIEW')")
 public List<String> userManagement(){
     return List.of(
       "USER_ROLE_ASSIGN",
       "USER_DELETE",
       "USER_LOGIN",
       "USER_REGISTER",
       "USER_DETAILS_VIEW",
       "USER_ROLES_VIEW",
       "USER_UPDATE",
       "USER_CURRENT_PERMISSIONS_VIEW",
       "USER_CURRENT_ROLES_VIEW"
     );
 }




  public List<String> getPermissionNamesByRoles(List<Role> roles) {
    return List.of(
        "USER_ROLE_ASSIGN",
        "USER_DELETE",
        "USER_LOGIN",
        "USER_REGISTER",
        "USER_DETAILS_VIEW",
        "USER_ROLES_VIEW",
        "USER_UPDATE",
        "USER_CURRENT_PERMISSIONS_VIEW",
        "USER_CURRENT_ROLES_VIEW");
  }
}
