package com.warehousepro.service;

import com.warehousepro.dto.request.auth.LoginRequest;
import com.warehousepro.dto.response.auth.LoginResponse;
import com.warehousepro.dto.response.auth.RefreshTokenResponse;
import com.warehousepro.dto.response.auth.TokensResponse;
import com.warehousepro.dto.response.auth.UserResponse;
import com.warehousepro.entity.PermissionName;
import com.warehousepro.entity.User;
import com.warehousepro.exception.EmailNotFoundException;
import com.warehousepro.exception.IncorrectPasswordException;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
  TokenService tokenService;
  UserService userService;
  RoleService roleService;
  PermissionService permissionService;
  BCryptPasswordEncoder passwordEncoder;

  public LoginResponse login(LoginRequest request) {
    log.info("Login attempt initiated for email: {}", request.getEmail());
    try {
      var user = userService.getByEmail(request.getEmail());

      if (user == null) {
        log.warn("User not found for email: {}", request.getEmail());
        throw new EmailNotFoundException("User not found");
      }

      if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        log.warn("Incorrect password for email: {}", request.getEmail());
        throw new IncorrectPasswordException("Incorrect password");
      }

      String refreshToken = tokenService.generateRefreshToken(user.getId());
      String accessToken = tokenService.generateAccessToken(user);

      log.info("Login successful for user ID: {}", user.getId());

      return LoginResponse.builder().tokens(new TokensResponse(accessToken, refreshToken)).build();
    } catch (EmailNotFoundException | IncorrectPasswordException e) {
      log.error("Login failed for email: {}. Reason: {}", request.getEmail(), e.getMessage());
      throw e;
    } catch (Exception e) {
      log.error("Unexpected error during login for email: {}", request.getEmail(), e);
      throw e;
    }
  }

  public RefreshTokenResponse refreshToken(String refreshToken) {
    log.info("Refresh token attempt initiated.");
    try {
      var decodedJWT = tokenService.decodeAccessToken(refreshToken);

      if (decodedJWT == null) {
        log.error("Invalid refresh token provided.");
        throw new IllegalArgumentException("Invalid token");
      }

      String userId = decodedJWT.getSubject();
      log.debug("Token decoded successfully. User ID: {}", userId);

      UserResponse user = userService.getById(userId);
      var newAccessToken = tokenService.generateAccessToken(user);

      log.info("New access token generated for user ID: {}", userId);
      return RefreshTokenResponse.builder().accessToken(newAccessToken).build();
    } catch (Exception e) {
      log.error("Error while refreshing token: {}", e.getMessage(), e);
      throw e;
    }
  }

  public List<PermissionName> getCurrentUserPermissionNames() {
    log.info("Fetching permissions for the current user.");
    try {
      var authentication = SecurityContextHolder.getContext().getAuthentication();
      if (authentication.getPrincipal() instanceof String) {
        log.debug("Anonymous user detected. Returning default permissions.");
        return List.of(PermissionName.AUTH_LOGIN);
      }

      Jwt jwt = (Jwt) authentication.getPrincipal();
      String userId = jwt.getSubject();

      log.debug("Fetching user details for user ID: {}", userId);
      User user;

      try {
        user = userService.getUserById(userId);
      } catch (Exception e) {
        log.error("Error while fetching user details for user ID: {}", userId, e);
        return List.of(PermissionName.AUTH_LOGIN);
      }

      if (user == null) {
        log.warn("User not found for user ID: {}", userId);
        return List.of(PermissionName.AUTH_LOGIN);
      }

      var roles = roleService.getRolesForUser(userId);
      log.debug("Roles fetched for user ID: {}: {}", userId, roles);

      var permissionNames =
          new ArrayList<>(
              permissionService.getPermissionNamesByRoleIds(
                  roles.stream().map(role -> role.getId()).toList()));
      permissionNames.add(PermissionName.AUTH_LOGIN);
      permissionNames.add(PermissionName.AUTH_LOGGED_IN);

      log.info("Permissions fetched for user ID: {}: {}", userId, permissionNames);
      return permissionNames;
    } catch (Exception e) {
      log.error("Error while fetching permissions for the current user.", e);
      throw e;
    }
  }
}
