package com.warehousepro.controller;

import com.warehousepro.dto.request.returns.CreateReturnRequest;
import com.warehousepro.dto.request.role.CreateRoleAssignmentRequest;
import com.warehousepro.dto.response.returns.ReturnResponse;
import com.warehousepro.dto.response.role.RoleAssignmentResponse;
import com.warehousepro.entity.Return;
import com.warehousepro.entity.RoleAssignment;
import com.warehousepro.mapstruct.RoleAssignmentMapper;
import com.warehousepro.service.RoleAssignmentService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/role-assignments")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleAssignmentController {
  RoleAssignmentService service;
  RoleAssignmentMapper mapper;

  @PostMapping
  public ResponseEntity<RoleAssignmentResponse> create(@RequestBody CreateRoleAssignmentRequest request){
    return ResponseEntity.ok(mapper.toRoleAssignmentResponse(service.create(request)));
  }

  @GetMapping
  public ResponseEntity<List<RoleAssignment>> getAll(){
    return ResponseEntity.ok(service.getAll());
  }
}
