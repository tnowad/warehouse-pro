package com.warehousepro.service;

// import com.warehousepro.dto.request.auth.RoleRequest;
import com.warehousepro.dto.request.role.CreateRoleRequest;
import com.warehousepro.dto.request.role.UpdateRoleRequest;
import com.warehousepro.dto.response.role.RoleRespone;
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




  public List<Role> getUserRoles(String userId) {
    List<Role> roles = roleRepository.findByUserId(userId);
    return roles;
  }
}
