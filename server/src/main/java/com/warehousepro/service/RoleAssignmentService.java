package com.warehousepro.service;

import com.warehousepro.dto.request.role.CreateRoleAssignmentRequest;
import com.warehousepro.entity.RoleAssignment;
import com.warehousepro.mapstruct.RoleAssignmentMapper;
import com.warehousepro.repository.RoleAssignmentRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RoleAssignmentService {
  RoleAssignmentRepository repository;
  RoleAssignmentMapper mapper;

  @Transactional
  public RoleAssignment create(CreateRoleAssignmentRequest request){
    RoleAssignment roleAssignment = mapper.toRoleAssignment(request);
    repository.save(roleAssignment);
    return roleAssignment;
  }

  public List<RoleAssignment> getAll(){
    return repository.findAll();
  }
}
