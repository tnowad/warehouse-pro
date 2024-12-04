package com.warehousepro.service;

import com.warehousepro.dto.request.role.CreateRoleRequest;
import com.warehousepro.dto.request.role.ListRoleRequest;
import com.warehousepro.dto.request.role.UpdateRoleRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.role.RoleResponse;
import com.warehousepro.entity.Permission;
import com.warehousepro.entity.Role;
import com.warehousepro.mapstruct.RoleMapper;
import com.warehousepro.repository.PermissionRepository;
import com.warehousepro.repository.RoleRepository;
import com.warehousepro.specification.RoleSpecification;
import jakarta.transaction.Transactional;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RoleService {
  RoleRepository roleRepository;
  RoleMapper roleMapper;
  RoleSpecification roleSpecification;
  PermissionRepository permissionRepository;

  @Transactional
  public Role create(CreateRoleRequest request) {
    // if(request.getName() == null || request.getName().isEmpty()){
    // throw new IllegalArgumentException("Role name cannot be null or empty");
    // }
    //
    // if(roleRepository.existsById(request.getName())){
    // throw new RuntimeException("role is existed");
    // }

    Role role = roleMapper.toRole(request);
    roleRepository.save(role);
    return role;
  }

  public ItemResponse<RoleResponse> getAll(ListRoleRequest filterRequest) {
    var spec = roleSpecification.getFilterSpecification(filterRequest);
    var pageRequest = PageRequest.of(filterRequest.getPage() - 1, filterRequest.getPageSize());
    var totalItems = roleRepository.count(spec);
    var roles = roleRepository.findAll(spec, pageRequest);
    var page = filterRequest.getPage();
    var pageCount = (int) Math.ceil((double) totalItems / filterRequest.getPageSize());

    return ItemResponse.<RoleResponse>builder()
        .items(roles.stream().map(roleMapper::toRoleResponse).collect(Collectors.toList()))
        .rowCount(Integer.valueOf(totalItems + ""))
        .page(page)
        .pageCount(pageCount)
        .build();
  }

  @Transactional
  public RoleResponse update(String id, UpdateRoleRequest request) {
    Role role = roleRepository.findById(id).orElseThrow();

    if (request.getDescription() != null) {
      role.setDescription(request.getDescription());
    }

    if (request.getPermissionIds() != null) {
      Set<Permission> updatedPermissions = new HashSet<>();

      for (String permissionId : request.getPermissionIds()) {
        Permission permission = permissionRepository.findById(permissionId).orElseThrow();
        updatedPermissions.add(permission);
      }

      role.setPermissions(updatedPermissions);
    }

    if (request.getName() != null) {
      role.setName(request.getName());
    }

    roleRepository.save(role);
    return roleMapper.toRoleResponse(role);
  }

  @Transactional
  public void delete(String id) {
    roleRepository.deleteUserRolesByRoleId(id);
    roleRepository.deletePermissionRolesByRoleId(id);
    roleRepository.deleteById(id);
  }

  public Set<Role> getUserRoles(String userId) {
    Set<Role> roles = roleRepository.findByUsersId(userId);
    return roles;
  }

  public Set<RoleResponse> getUserRolesResponse(String userId) {
    Set<Role> roles = roleRepository.findByUsersId(userId);
    return roles.stream().map(roleMapper::toRoleResponse).collect(Collectors.toSet());
  }

  public Role getRoleById(String id) {
    return roleRepository
        .findOne((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("id"), id))
        .orElse(null);
  }

  public Set<Role> getRolesByIds(Set<String> roleIds) {
    return roleRepository.findAllById(roleIds).stream().collect(Collectors.toSet());
  }
}
