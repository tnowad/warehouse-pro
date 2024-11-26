package com.warehousepro.service;

import com.warehousepro.dto.request.role.CreateRoleRequest;
import com.warehousepro.dto.request.role.ListRoleRequest;
import com.warehousepro.dto.request.role.UpdateRoleRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.auth.UserResponse;
import com.warehousepro.dto.response.role.RoleRespone;
import com.warehousepro.entity.Role;
import com.warehousepro.mapstruct.RoleMapper;
import com.warehousepro.repository.RoleRepository;
import com.warehousepro.repository.UserRepository;
import com.warehousepro.specification.RoleSpecification;
import jakarta.transaction.Transactional;
import java.util.List;
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
  UserRepository userRepository;
  RoleSpecification roleSpecification;

  @Transactional
  public Role create(CreateRoleRequest request) {
    //    if(request.getName() == null || request.getName().isEmpty()){
    //      throw new IllegalArgumentException("Role name cannot be null or empty");
    //    }
    //
    //    if(roleRepository.existsById(request.getName())){
    //      throw new RuntimeException("role is existed");
    //    }

    Role role = roleMapper.toRole(request);
    roleRepository.save(role);
    return role;
  }

  public ItemResponse<RoleRespone> getAll(ListRoleRequest filterRequest) {
    var spec = roleSpecification.getFilterSpecification(filterRequest);
    var pageRequest = PageRequest.of(filterRequest.getPage() - 1, filterRequest.getPageSize());
    var totalItems = roleRepository.count(spec);
    var roles = roleRepository.findAll(spec, pageRequest);
    var page = filterRequest.getPage();
    var pageCount = (int) Math.ceil((double) totalItems / filterRequest.getPageSize());

    return ItemResponse.<RoleRespone>builder()
      .items(
        roles.stream().map(roleMapper::toRoleRespone)
          .collect(Collectors.toList()))
      .rowCount(Integer.valueOf(totalItems + ""))
      .page(page)
      .pageCount(pageCount)
      .build();
  }

  @Transactional
  public RoleRespone update(String id , UpdateRoleRequest request){
    Role role = roleRepository.findByName(id);

    if (role.getDescription() != null){
      role.setDescription(request.getDescription());
    }

    role.setName(request.getName());

    roleRepository.save(role);
    return roleMapper.toRoleRespone(role);
  }

  @Transactional
  public void delete(String id){
    roleRepository.deleteById(id);
  }


  public List<Role> getUserRoles(String userId) {
    List<Role> roles = roleRepository.findByUserId(userId);
    return roles;
  }
}
