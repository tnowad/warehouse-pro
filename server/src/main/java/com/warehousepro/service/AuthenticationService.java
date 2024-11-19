package com.warehousepro.service;

import com.warehousepro.dto.request.auth.LoginRequest;
import com.warehousepro.dto.response.auth.LoginResponse;
import com.warehousepro.dto.response.auth.RefreshTokenResponse;
import com.warehousepro.dto.response.auth.TokensResponse;
import com.warehousepro.exception.EmailNotFoundException;
import com.warehousepro.exception.IncorrectPasswordException;
import com.warehousepro.mapstruct.UserMapper;
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
  UserMapper userMapper;

  public LoginResponse login(LoginRequest request) {
    try {
      var user = userService.getUserByEmail(request.getEmail());

      if (user == null) {
        throw new EmailNotFoundException("User not found");
      }

      if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        throw new IncorrectPasswordException("Incorrect password");
      }

      String refreshToken;
      String accessToken;

      refreshToken = tokenService.generateRefreshToken(user.getId());
      accessToken = tokenService.generateAccessToken(user.getId());

      return LoginResponse.builder()
          .user(userMapper.toUserResponse(user))
          .tokens(new TokensResponse(accessToken, refreshToken))
          .build();
    } catch (EmailNotFoundException | IncorrectPasswordException e) {
      log.warn("Error while logging in: {}", e.getMessage());
      throw e;
    }
  }

  public RefreshTokenResponse refreshToken(String refreshToken) {
    var decodedJWT = tokenService.decodeAccessToken(refreshToken);
    log.info("Decoded JWT: {}", decodedJWT);

    if (decodedJWT == null) {
      throw new IllegalArgumentException("Invalid token");
    }

    var userId = decodedJWT.getSubject();
    var newAccessToken = tokenService.generateAccessToken(userId);

    return RefreshTokenResponse.builder().accessToken(newAccessToken).build();
  }

  public List<String> getCurrentUserPermissionNames() {

    if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof String) {
      return List.of("AUTH_LOGIN");
    }
    Jwt jwt = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    String userId = jwt.getSubject();
    var roles = roleService.getUserRoles(userId);
    var permissionNames = permissionService.getPermissionNamesByRoles(roles);
    return permissionNames;
  }
}
