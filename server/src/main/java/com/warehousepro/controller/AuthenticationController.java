package com.warehousepro.controller;

import com.warehousepro.dto.request.auth.LoginRequest;
import com.warehousepro.dto.request.auth.RefreshTokenRequest;
import com.warehousepro.dto.response.auth.LoginResponse;
import com.warehousepro.dto.response.auth.RefreshTokenResponse;
import com.warehousepro.dto.response.auth.UserResponse;
import com.warehousepro.dto.response.error.ValidationErrorResponse;
import com.warehousepro.dto.response.permission.GetCurrentUserPermissionResponse;
import com.warehousepro.service.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {

  AuthenticationService authenticationService;

  @Operation(summary = "Login")
  @ApiResponses(
      value = {
        @ApiResponse(
            responseCode = "200",
            description = "Login success",
            content = {
              @Content(
                  mediaType = "application/json",
                  schema = @Schema(implementation = LoginResponse.class))
            }),
        @ApiResponse(
            responseCode = "404",
            description = "User not found",
            content = {
              @Content(
                  mediaType = "application/json",
                  schema =
                      @Schema(
                          implementation = ValidationErrorResponse.class,
                          example = "User not found"))
            })
      })
  @PostMapping("/login")
  public ResponseEntity<LoginResponse> authenticate(
      @RequestBody @Valid @Parameter(description = "Login request body", required = true)
          LoginRequest request) {
    var response = authenticationService.login(request);
    return ResponseEntity.ok(response);
  }

  @Operation(summary = "Refresh token")
  @PostMapping("/refresh")
  public ResponseEntity<RefreshTokenResponse> refreshToken(
      @RequestBody @Valid @Parameter(description = "Refresh token request body", required = true)
          RefreshTokenRequest request) {
    var response = authenticationService.refreshToken(request.getRefreshToken());
    return ResponseEntity.ok(response);
  }

  @GetMapping("/current-user")
  public ResponseEntity<UserResponse> currentUser(
      @RequestHeader(required = false, name = "Authorization") String token) {
    System.out.println("Token: " + token);
    if (token == null) {
      throw new RuntimeException("Unauthorized");
    }

    return ResponseEntity.ok(
        UserResponse.builder()
            .id("0e8b3b3b-4b3b-4b3b-4b3b-4b3b4b3b4b3b")
            .name("Admin")
            .email("admin@warehouse-pro.com")
            .build());
  }

  @GetMapping("/current-user/permissions")
  public ResponseEntity<GetCurrentUserPermissionResponse> currentUserPermissions() {

    var permissionNames = authenticationService.getCurrentUserPermissionNames();

    return ResponseEntity.ok(
        GetCurrentUserPermissionResponse.builder().items(permissionNames).build());
  }
}
