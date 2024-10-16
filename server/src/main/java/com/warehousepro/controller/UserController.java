package com.warehousepro.controller;

import com.warehousepro.dto.request.auth.CreateUserRequest;
import com.warehousepro.dto.response.auth.UserResponse;
import com.warehousepro.entity.User;
import com.warehousepro.mapstruct.UserMapper;
import com.warehousepro.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {

  UserService userService;
  UserMapper userMapper;



  @PostMapping
  UserResponse create(@RequestBody CreateUserRequest request) {
    var user = userService.createUser(request);
    return UserResponse.builder().id(user.getId()).username(user.getUsername())
        .email(user.getEmail()).createdAt(user.getCreatedAt()).updatedAt(user.getUpdatedAt())
        .build();
  }

  @Operation(summary = "Get a user by its id")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Found the user",
          content = {@Content(mediaType = "application/json",
              schema = @Schema(implementation = UserResponse.class))}),
      @ApiResponse(responseCode = "400", description = "Invalid id supplied",
          content = {@Content(mediaType = "application/json",
              schema = @Schema(implementation = Error.class))}),

      @ApiResponse(responseCode = "404", description = "User not found",
          content = {@Content(mediaType = "application/json",
              schema = @Schema(implementation = Error.class))})})
  @GetMapping("/{userId}")
  UserResponse getUser(
      @PathVariable @Parameter(description = "id of user to be searched") String userId) {
    var user = userService.getUser(userId);
    return UserResponse.builder().id(user.getId()).username(user.getUsername())
        .email(user.getEmail()).createdAt(user.getCreatedAt()).updatedAt(user.getUpdatedAt())
        .build();
  }

  @GetMapping
  List<UserResponse> getUsers() {
    return userService.getUsers();
  }



}
