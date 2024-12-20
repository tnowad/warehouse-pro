package com.warehousepro.controller;

import com.warehousepro.dto.request.permission.CreatePermisionRequest;
import com.warehousepro.dto.request.permission.ListPermissionRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.permission.PermissionResponse;
import com.warehousepro.entity.Permission;
import com.warehousepro.mapstruct.PermissonMapper;
import com.warehousepro.service.PermissionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/permissions")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PermissionController {
  PermissionService permissionService;
  PermissonMapper permissonMapper;

  @GetMapping
  public ResponseEntity<ItemResponse<PermissionResponse>> listPermissions(
      @ModelAttribute ListPermissionRequest listPermissionRequest) {
    return ResponseEntity.ok(permissionService.listPermissions(listPermissionRequest));
  }

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

  @DeleteMapping("/{id}")
  public ResponseEntity<String> delete(@PathVariable("id") String id) {
    permissionService.delete(id);
    return ResponseEntity.ok("xóa thành công");
  }
}
