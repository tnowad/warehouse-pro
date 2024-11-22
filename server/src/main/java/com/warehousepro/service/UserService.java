package com.warehousepro.service;

import com.warehousepro.dto.request.auth.CreateUserRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.auth.UserResponse;
import com.warehousepro.dto.response.role.RoleRespone;
import com.warehousepro.entity.Permission;
import com.warehousepro.entity.Role;
import com.warehousepro.entity.User;
import com.warehousepro.exception.ValidationException;
import com.warehousepro.mapstruct.RoleMapper;
import com.warehousepro.mapstruct.UserMapper;
import com.warehousepro.repository.PermissionRepository;
import com.warehousepro.repository.RoleRepository;
import com.warehousepro.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class UserService {

  UserRepository userRepository;
  UserMapper userMapper;
  final PasswordEncoder passwordEncoder;
  RoleRepository roleRepository;
  PermissionRepository permissionRepository;
  private final RoleMapper roleMapper;

  @Transactional
  public UserResponse createUser(CreateUserRequest request) {
    if (userRepository.findByEmail(request.getEmail()).isPresent()) {
      throw new ValidationException(
          Map.of("email", List.of("Email has been used")), "User already exists");
    }

    User user =
        User.builder()
            .email(request.getEmail())
            .name(request.getName())
            .password(passwordEncoder.encode(request.getPassword()))
            .build();

    return userMapper.toUserResponse(userRepository.save(user));
  }

  public UserResponse getUser(String id) {
    User user =
        userRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy id"));
    return userMapper.toUserResponse(user);
  }

  public ItemResponse<UserResponse> getUsers(String query, int page, int pageSize) {
    List<User> allUser = userRepository.searchRoles(query);

    int totalItems = allUser.size();
    int startIndex = Math.max(0, (page - 1) * pageSize);
    int endIndex = Math.min(startIndex + pageSize, totalItems);
    List<User> paginatedRoles = allUser.subList(startIndex, endIndex);

    List<UserResponse> userResponses = paginatedRoles.stream().map(userMapper::toUserResponse).collect(Collectors.toList());

    userResponses.forEach(userResponse -> userResponse.setRoleRespones(
      viewUserRoles(userResponse.getId()).stream().map(roleMapper::toRoleRespone).collect(Collectors.toSet())));

    int pageCount = (int) Math.ceil((double) totalItems / pageSize);

    return ItemResponse.<UserResponse>builder()
      .items(userResponses)
      .rowCount(totalItems)
      .page(page)
      .pageCount(pageCount)
      .build();

  }



  public User getUserByEmail(String email) {
    return userRepository.findByEmail(email).orElse(null);
  }

  public User getUserById(String id) {
    return userRepository.findById(id).orElse(null);
  }

  public void delete(String id) {
    userRepository.deleteById(id);
  }

  public User assignRoleToUser(String userId, String roleId) {
    User user =
        userRepository
            .findById(userId)
            .orElseThrow(() -> new EntityNotFoundException("User not found"));
    Role role =
        roleRepository
            .findById(roleId)
            .orElseThrow(() -> new EntityNotFoundException("Role not found"));
    user.addRole(role);
    return userRepository.save(user);
  }

  public Set<Role> viewUserRoles(String userid) {
    // nó không lấy ra được role từ userid
    log.info(roleRepository.findRoleIdsByUserId(userid).toString() +"xincahao");

    return roleRepository.findRolesByUsersId(userid);
  }

  public Set<Permission> viewUserPermissions(String userId) {
    return permissionRepository.findPermissionsByUsersId(userId);
  }
}
