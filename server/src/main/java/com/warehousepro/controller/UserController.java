package com.warehousepro.controller;

import com.warehousepro.dto.request.auth.CreateUserRequest;
import com.warehousepro.dto.request.auth.UpdateUserRequest;
import com.warehousepro.dto.request.user.ListUserRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.auth.UserResponse;
import com.warehousepro.dto.response.role.GetUserRolesItemResponse;
import com.warehousepro.entity.Permission;
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

  @PostMapping
  ResponseEntity<UserResponse> createUser(@RequestBody CreateUserRequest request) {
    var user = userService.registerUser(request);
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
  ResponseEntity<UserResponse> getUserById(
      @PathVariable @Parameter(description = "id of user to be searched") String userId) {
    return ResponseEntity.ok(userService.findUserResponseById(userId));
  }

  @GetMapping
  public ResponseEntity<ItemResponse<UserResponse>> getUsers(
      @ModelAttribute ListUserRequest listUserRequest) {
    return ResponseEntity.ok(userService.findUsersByFilter(listUserRequest));
  }

  @DeleteMapping("/{id}")
  ResponseEntity<String> deleteUserById(@PathVariable("id") String id) {
    userService.removeUserById(id);
    return ResponseEntity.ok("Xóa User thành công");
  }

  @PutMapping("/{id}")
  ResponseEntity<UserResponse> updateUser(
      @PathVariable("id") String id, @RequestBody UpdateUserRequest request) {
    return ResponseEntity.ok(userService.updateUserDetails(id, request));
  }

  @GetMapping("/{userId}/roles")
  ResponseEntity<ItemResponse<GetUserRolesItemResponse>> getUserRoles(
      @PathVariable("userId") String id) {
    return ResponseEntity.ok(userService.getUserRoles(id));
  }

  @GetMapping("/{userId}/permissions")
  ResponseEntity<Set<Permission>> getUserPermissions(@PathVariable("userId") String id) {
    Set<Permission> permissions = userService.getUserPermissions(id);
    return ResponseEntity.ok(permissions);
  }
}
