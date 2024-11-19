package com.warehousepro.service;

// import com.warehousepro.dto.request.auth.RoleRequest;
import com.warehousepro.dto.request.role.CreateRoleRequest;
import com.warehousepro.entity.Role;
// import com.warehousepro.entity.User;
import com.warehousepro.mapstruct.RoleMapper;
import com.warehousepro.repository.RoleRepository;
import com.warehousepro.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RoleService {
  RoleRepository roleRepository;
  RoleMapper roleMapper;
  UserRepository userRepository;

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

  public List<Role> getUserRoles(String userId) {
    List<Role> roles = roleRepository.findByUserId(userId);
    return roles;
  }
}
