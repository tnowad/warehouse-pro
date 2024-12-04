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
  public Role createRole(CreateRoleRequest request) {
    log.info("Creating role with name: {}", request.getName());

    Role role = roleMapper.toRole(request);
    roleRepository.save(role);

    log.info("Role created successfully with ID: {}", role.getId());
    return role;
  }

  public ItemResponse<RoleResponse> getRoles(ListRoleRequest filterRequest) {
    log.info("Fetching roles with filter request: {}", filterRequest);

    var spec = roleSpecification.getFilterSpecification(filterRequest);
    var pageRequest = PageRequest.of(filterRequest.getPage() - 1, filterRequest.getPageSize());
    var totalItems = roleRepository.count(spec);
    var roles = roleRepository.findAll(spec, pageRequest);
    var page = filterRequest.getPage();
    var pageCount = (int) Math.ceil((double) totalItems / filterRequest.getPageSize());

    log.info("Fetched {} roles. Page: {}, Total Items: {}", roles.getSize(), page, totalItems);

    return ItemResponse.<RoleResponse>builder()
        .items(roles.stream().map(roleMapper::toRoleResponse).collect(Collectors.toList()))
        .rowCount(totalItems)
        .page(page)
        .pageCount(pageCount)
        .build();
  }

  @Transactional
  public RoleResponse updateRole(String id, UpdateRoleRequest request) {
    log.info("Updating role with ID: {}", id);

    Role role =
        roleRepository
            .findById(id)
            .orElseThrow(
                () -> {
                  log.error("Role with ID {} not found", id);
                  return new RuntimeException("Role not found");
                });

    if (request.getDescription() != null) {
      role.setDescription(request.getDescription());
      log.info("Updated role description to: {}", request.getDescription());
    }

    if (request.getPermissionIds() != null) {
      Set<Permission> updatedPermissions = new HashSet<>();
      for (String permissionId : request.getPermissionIds()) {
        Permission permission =
            permissionRepository
                .findById(permissionId)
                .orElseThrow(
                    () -> {
                      log.error("Permission with ID {} not found", permissionId);
                      return new RuntimeException("Permission not found");
                    });
        updatedPermissions.add(permission);
      }
      role.setPermissions(updatedPermissions);
      log.info("Updated role permissions.");
    }

    if (request.getName() != null) {
      role.setName(request.getName());
      log.info("Updated role name to: {}", request.getName());
    }

    roleRepository.save(role);
    log.info("Role with ID {} updated successfully", id);
    return roleMapper.toRoleResponse(role);
  }

  @Transactional
  public void deleteRole(String id) {
    log.info("Deleting role with ID: {}", id);

    roleRepository.deleteUserRolesByRoleId(id);
    roleRepository.deletePermissionRolesByRoleId(id);
    roleRepository.deleteById(id);

    log.info("Role with ID {} deleted successfully", id);
  }

  public Set<Role> getRolesForUser(String userId) {
    log.info("Fetching roles for user with ID: {}", userId);
    Set<Role> roles = roleRepository.findByUsersId(userId);
    log.info("Fetched {} roles for user with ID: {}", roles.size(), userId);
    return roles;
  }

  public Set<RoleResponse> getRoleResponsesForUser(String userId) {
    log.info("Fetching role responses for user with ID: {}", userId);
    Set<Role> roles = roleRepository.findByUsersId(userId);
    log.info("Fetched {} roles for user with ID: {}", roles.size(), userId);
    return roles.stream().map(roleMapper::toRoleResponse).collect(Collectors.toSet());
  }

  public Role getRoleById(String id) {
    log.info("Fetching role by ID: {}", id);
    return roleRepository
        .findOne((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("id"), id))
        .orElseThrow(
            () -> {
              log.error("Role with ID {} not found", id);
              return new RuntimeException("Role not found");
            });
  }

  public Set<Role> getRolesByIds(Set<String> roleIds) {
    log.info("Fetching roles by IDs: {}", roleIds);
    Set<Role> roles = roleRepository.findAllById(roleIds).stream().collect(Collectors.toSet());
    log.info("Fetched {} roles by provided IDs", roles.size());
    return roles;
  }
}
