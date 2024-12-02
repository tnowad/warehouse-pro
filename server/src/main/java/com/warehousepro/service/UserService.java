package com.warehousepro.service;

import com.warehousepro.dto.request.auth.CreateUserRequest;
import com.warehousepro.dto.request.user.ListUserRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.auth.UserResponse;
import com.warehousepro.dto.response.role.GetUserRolesItemResponse;
import com.warehousepro.entity.Permission;
import com.warehousepro.entity.Role;
import com.warehousepro.entity.User;
import com.warehousepro.exception.ValidationException;
import com.warehousepro.mapstruct.RoleMapper;
import com.warehousepro.mapstruct.UserMapper;
import com.warehousepro.repository.PermissionRepository;
import com.warehousepro.repository.RoleRepository;
import com.warehousepro.repository.UserRepository;
import com.warehousepro.specification.UserSpecification;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class UserService {

  RoleService roleService;
  UserRepository userRepository;
  UserMapper userMapper;
  final PasswordEncoder passwordEncoder;
  RoleRepository roleRepository;
  PermissionRepository permissionRepository;
  private final RoleMapper roleMapper;
  UserSpecification userSpecification;

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
    return userMapper.toUserResponse(
        userRepository
            .findById(id)
            .orElseThrow(() -> new EntityNotFoundException("User not found")));
  }

  public ItemResponse<UserResponse> getUsers(ListUserRequest filterRequest) {
    var spec = userSpecification.getFilterSpecification(filterRequest);
    var pageRequest = PageRequest.of(filterRequest.getPage() - 1, filterRequest.getPageSize());
    var totalItems = userRepository.count(spec);
    var users = userRepository.findAll(spec, pageRequest);
    var page = filterRequest.getPage();
    var pageCount = (int) Math.ceil((double) totalItems / filterRequest.getPageSize());

    return ItemResponse.<UserResponse>builder()
        .items(users.stream().map(userMapper::toUserResponse).collect(Collectors.toList()))
        .rowCount(Integer.valueOf(totalItems + ""))
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

  public UserResponse getById(String id) {
    return userMapper.toUserResponse(
        userRepository
            .findById(id)
            .orElseThrow(() -> new EntityNotFoundException("User not found")));
  }

  public UserResponse getByEmail(String email) {
    return userMapper.toUserResponse(
        userRepository
            .findByEmail(email)
            .orElseThrow(() -> new EntityNotFoundException("User not found")));
  }

  @Transactional
  public void delete(String id) {
    userRepository.deleteById(id);
  }

  @Transactional
  public User assignRoleToUser(String userId, String roleId) {
    User user =
        userRepository
            .findById(userId)
            .orElseThrow(() -> new EntityNotFoundException("User not found"));
    Role role =
        roleRepository
            .findById(roleId)
            .orElseThrow(() -> new EntityNotFoundException("Role not found"));

    var roles = user.getRoles();
    roles.add(role);
    user.setRoles(roles);

    return userRepository.save(user);
  }

  public ItemResponse<GetUserRolesItemResponse> viewUserRoles(String userId) {
    var roles = roleService.getUserRoles(userId);

    return ItemResponse.<GetUserRolesItemResponse>builder()
        .items(roles.stream().map(roleMapper::toItem).collect(Collectors.toList()))
        .build();
  }

  public Set<Permission> viewUserPermissions(String userId) {
    User user = userRepository.findById(userId).orElseThrow();
    Set<Role> roles = user.getRoles();
    Set<Permission> permissions = new HashSet<>();
    roles.forEach(role -> permissions.addAll(role.getPermissions()));
    return permissions;
  }
}
