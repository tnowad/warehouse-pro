package com.warehousepro.controller;

import com.warehousepro.dto.request.role.CreateRoleRequest;
import com.warehousepro.dto.response.role.RoleRespone;
import com.warehousepro.entity.Role;
import com.warehousepro.mapstruct.RoleMapper;
import com.warehousepro.service.RoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleController {
  RoleService roleService;
  RoleMapper roleMapper;

  @PostMapping
  public ResponseEntity<RoleRespone>  create(@RequestBody CreateRoleRequest request){
    RoleRespone roleRespone = roleMapper.toRoleRespone(roleService.create(request));
    return  ResponseEntity.ok(roleRespone);
  }
}