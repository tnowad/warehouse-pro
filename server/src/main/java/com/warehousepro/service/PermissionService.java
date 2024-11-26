package com.warehousepro.service;

import com.warehousepro.dto.request.permission.CreatePermisionRequest;
import com.warehousepro.dto.request.permission.ListPermissionRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.permission.PermissionResponse;
import com.warehousepro.entity.Permission;
import com.warehousepro.entity.PermissionName;
import com.warehousepro.entity.Role;
import com.warehousepro.mapstruct.PermissonMapper;
import com.warehousepro.repository.PermissionRepository;
import com.warehousepro.repository.RoleRepository;
import com.warehousepro.specification.PermissionSpecification;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import java.util.List;
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
public class PermissionService {
  PermissionSpecification permissionSpecification;
  PermissionRepository permissionRepository;
  PermissonMapper permissonMapper;
  RoleRepository roleRepository;

  public ItemResponse<PermissionResponse> listPermissions(ListPermissionRequest filterRequest) {
    var spec = permissionSpecification.getFilterSpecification(filterRequest);
    var pageRequest = PageRequest.of(filterRequest.getPage() - 1, filterRequest.getPageSize());
    var totalItems = permissionRepository.count(spec);
    var permissions = permissionRepository.findAll(spec, pageRequest);
    var page = filterRequest.getPage();
    var pageCount = (int) Math.ceil((double) totalItems / filterRequest.getPageSize());
    return ItemResponse.<PermissionResponse>builder()
        .items(permissions.stream().map(permissonMapper::toPermissionResponse).toList())
        .rowCount(Integer.valueOf(totalItems + ""))
        .page(page)
        .pageCount(pageCount)
        .build();
  }

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

  public List<PermissionName> getPermissionNamesByRoleIds(List<String> roleIds) {
    return permissionRepository.getPermissionNamesByRoleIds(roleIds);
  }

  @Transactional
  public void delete(String id) {
    permissionRepository.deleteById(id);
  }
}
