package com.warehousepro.controller;

import com.warehousepro.dto.request.permission.CreatePermisionRequest;
import com.warehousepro.dto.response.permission.PermissionResponse;
import com.warehousepro.entity.Permission;
import com.warehousepro.mapstruct.PermissonMapper;
import com.warehousepro.service.PermissionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/permissions")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PermissionController {
  PermissionService permissionService;
  PermissonMapper permissonMapper;

  @PostMapping
  public ResponseEntity<PermissionResponse> create(@RequestBody CreatePermisionRequest request) {
    PermissionResponse permissionResponse =
        permissonMapper.toPermissionResponse(permissionService.create(request));
    return ResponseEntity.ok(permissionResponse);
  }

  @PutMapping("/assignRoleToPermission/{per_id}/{role_id}")
  public ResponseEntity<Permission> assignRoleToPermission(
      @PathVariable("per_id") String perId, @PathVariable("role_id") String role_id) {
    Permission permission = permissionService.assignRoleToPermission(perId, role_id);
    return ResponseEntity.ok(permission);
  }

  @GetMapping("/general")
  public ResponseEntity<List<String>> general(){
    return ResponseEntity.ok(permissionService.general());
  }

  @GetMapping("/user-management")
  public ResponseEntity<List<String>> userManagement(){
    return ResponseEntity.ok(permissionService.userManagement());
  }
}
