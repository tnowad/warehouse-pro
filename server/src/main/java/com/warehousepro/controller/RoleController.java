package com.warehousepro.controller;

import com.warehousepro.dto.request.role.CreateRoleRequest;
import com.warehousepro.dto.request.role.ListRoleRequest;
import com.warehousepro.dto.request.role.UpdateRoleRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.role.RoleRespone;
import com.warehousepro.mapstruct.RoleMapper;
import com.warehousepro.service.RoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleController {
  RoleService roleService;
  RoleMapper roleMapper;

  @PostMapping
  public ResponseEntity<RoleRespone> create(@RequestBody CreateRoleRequest request) {
    RoleRespone roleRespone = roleMapper.toRoleRespone(roleService.create(request));
    return ResponseEntity.ok(roleRespone);
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<RoleRespone> update(
      @PathVariable String id, @RequestBody UpdateRoleRequest request) {
    return ResponseEntity.ok(roleService.update(id, request));
  }

  @GetMapping
  public ResponseEntity<ItemResponse<RoleRespone>> getAll(
      @ModelAttribute ListRoleRequest listRoleRequest) {
    return ResponseEntity.ok(roleService.getAll(listRoleRequest));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> delete(@PathVariable("id") String id) {
    roleService.delete(id);
    return ResponseEntity.ok("xóa thành công");
  }
}
