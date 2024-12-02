package com.warehousepro.controller;

import com.warehousepro.dto.request.role.CreateRoleRequest;
import com.warehousepro.dto.request.role.ListRoleRequest;
import com.warehousepro.dto.request.role.UpdateRoleRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.role.RoleResponse;
import com.warehousepro.mapstruct.PermissionMapper;
import com.warehousepro.mapstruct.RoleMapper;
import com.warehousepro.service.PermissionService;
import com.warehousepro.service.RoleService;
import java.util.HashSet;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleController {
  RoleService roleService;
  PermissionMapper permissionMapper;
  PermissionService permissionService;
  RoleMapper roleMapper;

  @PostMapping
  public ResponseEntity<RoleResponse> create(@RequestBody CreateRoleRequest request) {
    RoleResponse roleRespone = roleMapper.toRoleResponse(roleService.create(request));
    return ResponseEntity.ok(roleRespone);
  }

  @PutMapping("/{id}")
  public ResponseEntity<RoleResponse> update(
      @PathVariable String id, @RequestBody UpdateRoleRequest request) {
    return ResponseEntity.ok(roleService.update(id, request));
  }

  @GetMapping
  public ResponseEntity<ItemResponse<RoleResponse>> getAll(
      @ModelAttribute ListRoleRequest listRoleRequest) {
    return ResponseEntity.ok(roleService.getAll(listRoleRequest));
  }

  @GetMapping("/{id}")
  public ResponseEntity<RoleResponse> get(@PathVariable("id") String id) {
    var role = roleService.getRoleById(id);
    var permissions = permissionService.getPermissionsByRoleId(id);
    var roleRespone = roleMapper.toRoleResponse(role);
    roleRespone.setPermissions(
        new HashSet<>(permissions.stream().map(permissionMapper::toPermissionResponse).toList()));
    return ResponseEntity.ok(roleRespone);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> delete(@PathVariable("id") String id) {
    roleService.delete(id);
    return ResponseEntity.ok("xóa thành công");
  }
}
