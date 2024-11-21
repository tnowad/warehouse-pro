package com.warehousepro.controller;

import com.warehousepro.dto.request.auth.CreateUserRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.auth.UserResponse;
import com.warehousepro.entity.Permission;
import com.warehousepro.entity.Role;
import com.warehousepro.entity.User;
import com.warehousepro.repository.UserRepository;
import com.warehousepro.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.util.Set;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {

  UserService userService;
  private final UserRepository userRepository;

  @PostMapping
  ResponseEntity<UserResponse> create(@RequestBody CreateUserRequest request) {
    var user = userService.createUser(request);
    return ResponseEntity.ok(user);
  }

  @Operation(summary = "Get a user by its id")
  @ApiResponses(
      value = {
        @ApiResponse(
            responseCode = "200",
            description = "Found the user",
            content = {
              @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = UserResponse.class))
            }),
        @ApiResponse(
            responseCode = "400",
            description = "Invalid id supplied",
            content = {
              @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = Error.class))
            }),
        @ApiResponse(
            responseCode = "404",
            description = "User not found",
            content = {
              @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = Error.class))
            })
      })
  @GetMapping("/{userId}")
  UserResponse getUser(
      @PathVariable @Parameter(description = "id of user to be searched") String userId) {
    var user = userService.getUser(userId);
    return UserResponse.builder()
        .id(user.getId())
        .email(user.getEmail())
        .createdAt(user.getCreatedAt())
        .updatedAt(user.getUpdatedAt())
        .build();
  }

  @GetMapping
  public ResponseEntity<ItemResponse<UserResponse>> getAll(@RequestParam(defaultValue = "") String query,
                                                          @RequestParam(defaultValue = "1") int page,
                                                          @RequestParam(defaultValue = "10") int pageSize){
    return ResponseEntity.ok(userService.getUsers(query, page, pageSize));
  }

  @DeleteMapping("/{id}")
  ResponseEntity<String> delete(@PathVariable("id") String id) {
    userService.delete(id);
    return ResponseEntity.ok("Xóa User thành công");
  }

  @PutMapping("/assignRoleToUser/{user_id}/{role_id}")
  ResponseEntity<User> assignRoleToUser(
      @PathVariable("user_id") String userId, @PathVariable("role_id") String roleId) {
    User user = userService.assignRoleToUser(userId, roleId);
    return ResponseEntity.ok(user);
  }

  @GetMapping("/viewUserRole/{user_id}")
  ResponseEntity<Set<Role>> viewUserRole(@PathVariable("user_id") String id) {
    Set<Role> roles = userService.viewUserRoles(id);
    return ResponseEntity.ok(roles);
  }

  @GetMapping("/viewUserPermission/{user_id}")
  ResponseEntity<Set<Permission>> viewUserPermission(@PathVariable("user_id") String id) {
    Set<Permission> permissions = userService.viewUserPermissions(id);
    return ResponseEntity.ok(permissions);
  }
}
