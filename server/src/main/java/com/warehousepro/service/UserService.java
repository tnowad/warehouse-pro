package com.warehousepro.service;

import com.warehousepro.dto.request.auth.CreateUserRequest;
import com.warehousepro.dto.request.auth.UpdateUserRequest;
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
  PasswordEncoder passwordEncoder;
  RoleRepository roleRepository;
  RoleMapper roleMapper;
  UserSpecification userSpecification;

  @Transactional
  public UserResponse createUser(CreateUserRequest request) {
    log.info("Creating user with email: {}", request.getEmail());
    if (userRepository.findByEmail(request.getEmail()).isPresent()) {
      log.warn("User with email {} already exists", request.getEmail());
      throw new ValidationException(
          Map.of("email", List.of("Email has been used")), "User already exists");
    }

    User user = User.builder()
        .email(request.getEmail())
        .name(request.getName())
        .password(passwordEncoder.encode(request.getPassword()))
        .build();

    User savedUser = userRepository.save(user);
    log.info("User created successfully with ID: {}", savedUser.getId());
    return userMapper.toUserResponse(savedUser);
  }

  public UserResponse getUser(String id) {
    log.info("Fetching user with ID: {}", id);
    return userMapper.toUserResponse(
        userRepository
            .findById(id)
            .orElseThrow(
                () -> {
                  log.error("User with ID {} not found", id);
                  return new EntityNotFoundException("User not found");
                }));
  }

  public ItemResponse<UserResponse> getUsers(ListUserRequest filterRequest) {
    log.debug("Fetching users with filter request: {}", filterRequest);
    var spec = userSpecification.getFilterSpecification(filterRequest);
    var pageRequest = PageRequest.of(filterRequest.getPage() - 1, filterRequest.getPageSize());
    var totalItems = userRepository.count(spec);
    var users = userRepository.findAll(spec, pageRequest);
    var page = filterRequest.getPage();
    var pageCount = (int) Math.ceil((double) totalItems / filterRequest.getPageSize());

    log.info("Fetched {} users. Page: {}, Total Items: {}", users.getSize(), page, totalItems);

    return ItemResponse.<UserResponse>builder()
        .items(users.stream().map(userMapper::toUserResponse).collect(Collectors.toList()))
        .rowCount(totalItems)
        .page(page)
        .pageCount(pageCount)
        .build();
  }

  public User getUserByEmail(String email) {
    return userRepository.findByEmail(email).orElse(null);
  }

  public UserResponse getById(String id) {
    log.info("Fetching user response by ID: {}", id);
    return userMapper.toUserResponse(
        userRepository
            .findById(id)
            .orElseThrow(
                () -> {
                  log.error("User with ID {} not found", id);
                  return new EntityNotFoundException("User not found");
                }));
  }

  public UserResponse getByEmail(String email) {
    log.info("Fetching user response by email: {}", email);
    return userMapper.toUserResponse(
        userRepository
            .findByEmail(email)
            .orElseThrow(
                () -> {
                  log.error("User with email {} not found", email);
                  return new EntityNotFoundException("User not found");
                }));
  }

  public User getUserById(String id) {
    log.info("Fetching user by ID: {}", id);
    return userRepository
        .findById(id)
        .orElseThrow(
            () -> {
              log.error("User with ID {} not found", id);
              return new EntityNotFoundException("User not found");
            });
  }

  @Transactional
  public void delete(String id) {
    log.info("Deleting user with ID: {}", id);
    userRepository.deleteById(id);
    log.info("User with ID {} deleted successfully", id);
  }

  @Transactional
  public User assignRoleToUser(String userId, String roleId) {
    log.info("Assigning role {} to user {}", roleId, userId);
    User user = userRepository
        .findById(userId)
        .orElseThrow(
            () -> {
              log.error("User with ID {} not found", userId);
              return new EntityNotFoundException("User not found");
            });

    Role role = roleRepository
        .findById(roleId)
        .orElseThrow(
            () -> {
              log.error("Role with ID {} not found", roleId);
              return new EntityNotFoundException("Role not found");
            });

    if (user.getRoles().stream().anyMatch(r -> r.getId().equals(roleId))) {
      log.warn("Role with ID {} is already assigned to user ID {}", roleId, userId);
      return user;
    }

    user.getRoles().add(role);
    User updatedUser = userRepository.save(user);
    log.info("Role {} assigned to user {} successfully", roleId, userId);
    return updatedUser;
  }

  public ItemResponse<GetUserRolesItemResponse> viewUserRoles(String userId) {
    log.info("Fetching roles for user ID: {}", userId);
    var roles = roleService.getUserRoles(userId);

    log.info("Fetched {} roles for user ID: {}", roles.size(), userId);

    return ItemResponse.<GetUserRolesItemResponse>builder()
        .items(roles.stream().map(roleMapper::toItem).collect(Collectors.toList()))
        .build();
  }

  public Set<Permission> viewUserPermissions(String userId) {
    log.info("Fetching permissions for user ID: {}", userId);
    User user = userRepository
        .findById(userId)
        .orElseThrow(
            () -> {
              log.error("User with ID {} not found", userId);
              return new EntityNotFoundException("User not found");
            });

    Set<Permission> permissions = user.getRoles().stream()
        .flatMap(role -> role.getPermissions().stream())
        .collect(Collectors.toSet());
    log.info("Fetched {} permissions for user ID: {}", permissions.size(), userId);
    return permissions;
  }

  @Transactional
  public UserResponse update(String id, UpdateUserRequest request) {
    log.info("Updating user with ID: {}", id);
    User user = userRepository
        .findById(id)
        .orElseThrow(
            () -> {
              log.error("User with ID {} not found", id);
              return new EntityNotFoundException("User not found");
            });

    if (request.getName() != null)
      user.setName(request.getName());
    if (request.getEmail() != null)
      user.setEmail(request.getEmail());
    if (request.getPassword() != null || !request.getPassword().isEmpty())
      user.setPassword(passwordEncoder.encode(request.getPassword()));

    if (request.getRoleIds() != null) {
      log.info("Processing role assignments for user ID: {}", id);
      List<String> newRoles = request.getRoleIds().stream()
          .filter(
              roleId -> user.getRoles().stream().noneMatch(role -> role.getId().equals(roleId)))
          .collect(Collectors.toList());

      newRoles.forEach(roleId -> this.assignRoleToUser(id, roleId));
      log.info("Added roles to user ID {}: {}", id, newRoles);
    }

    User updatedUser = userRepository.save(user);
    log.info("User with ID {} updated successfully", id);
    return userMapper.toUserResponse(updatedUser);
  }
}
