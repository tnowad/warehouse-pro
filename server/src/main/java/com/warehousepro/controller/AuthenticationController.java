package com.warehousepro.controller;

import com.nimbusds.jose.JOSEException;
import com.warehousepro.dto.request.auth.LoginRequest;
import com.warehousepro.dto.response.auth.LoginResponse;
import com.warehousepro.entity.User;
import com.warehousepro.mapstruct.UserMapper;
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
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {

  AuthenticationService authenticationService;
  UserMapper userMapper;

  @Operation(summary = "Login")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Login success",
          content = { @Content(mediaType = "application/json",
              schema = @Schema(implementation = LoginResponse.class)) }),
      @ApiResponse(responseCode = "400", description = "Bad request",
          content = { @Content(mediaType = "application/json",
              schema = @Schema(implementation = Error.class , example = "Invalid username or password")) }),

      @ApiResponse(responseCode = "404", description = "User not found",
          content = {@Content(mediaType = "application/json",
              schema = @Schema(implementation = Error.class , example = "User not found"))})})
  @PostMapping("/login")
  public LoginResponse authenticate(@RequestBody @Valid
                                    @Parameter(description = "Login request body", required = true)
                                    LoginRequest request) throws JOSEException {
    var result = authenticationService.authenticate(request);
    return LoginResponse.builder().token(result.getToken()).user(result.getUser()).build();
  }

}
