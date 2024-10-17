package com.warehousepro.controller;

import com.warehousepro.dto.request.auth.LoginRequest;
import com.warehousepro.dto.request.auth.RefreshTokenRequest;
import com.warehousepro.dto.response.auth.LoginResponse;
import com.warehousepro.dto.response.auth.RefreshTokenResponse;
import com.warehousepro.dto.response.error.ValidationErrorResponse;
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
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Login success",
          content = {@Content(mediaType = "application/json",
              schema = @Schema(implementation = LoginResponse.class))}),
      @ApiResponse(responseCode = "404", description = "User not found",
          content = {@Content(mediaType = "application/json",
              schema = @Schema(implementation = ValidationErrorResponse.class,
                  example = "User not found"))})})
  @PostMapping("/login")
  public ResponseEntity<LoginResponse> authenticate(@RequestBody @Valid @Parameter(
      description = "Login request body", required = true) LoginRequest request) {
    return ResponseEntity.ok(authenticationService.login(request));
  }

  @Operation(summary = "Refresh token")
  @PostMapping("/refresh")
  public ResponseEntity<RefreshTokenResponse> refreshToken(@RequestBody @Valid @Parameter(
      description = "Refresh token request body", required = true) RefreshTokenRequest request) {
    return ResponseEntity.ok(authenticationService.refreshToken(request.getRefreshToken()));
  }
}
