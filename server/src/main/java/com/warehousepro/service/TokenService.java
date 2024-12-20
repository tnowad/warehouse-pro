package com.warehousepro.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.warehousepro.dto.response.auth.TokensResponse;
import com.warehousepro.dto.response.auth.UserResponse;
import com.warehousepro.dto.response.role.RoleResponse;
import java.util.Date;
import java.util.StringJoiner;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TokenService {
  RoleService roleService;
  UserService userService;
  PermissionService permissionService;
  String accessSecret = "accessSecret";
  String refreshSecret = "refreshSecret";
  long accessExpiration = 1000 * 60 * 60 * 24;
  long refreshExpiration = 1000 * 60 * 60 * 24 * 30;

  public String generateAccessToken(UserResponse user) {
    Date now = new Date();
    Date expirationTime = new Date(now.getTime() + accessExpiration);

    log.info("Generating access token for user: {}", user.getId());
    log.info("Access token expiration time: {}", expirationTime);

    return JWT.create()
        .withSubject(user.getId())
        .withIssuedAt(now)
        .withExpiresAt(expirationTime)
        .withClaim("scope", buildScope(user))
        .sign(Algorithm.HMAC256(accessSecret));
  }

  private String buildScope(UserResponse user) {
    StringJoiner stringJoiner = new StringJoiner(" ");
    var roles = roleService.getRoleResponsesForUser(user.getId());
    var permissions =
        permissionService.getPermissionNamesByRoleIds(
            roles.stream().map(RoleResponse::getId).toList());
    if (!CollectionUtils.isEmpty(permissions)) {
      permissions.forEach(
          permission -> {
            stringJoiner.add("PERMISSION_" + permission.toString());
          });
    }

    log.info("Scope built: {}", stringJoiner.toString());
    return stringJoiner.toString();
  }

  public String generateRefreshToken(String userId) {
    Date now = new Date();
    Date expirationTime = new Date(now.getTime() + refreshExpiration);

    log.info("Generating refresh token for user: {}", userId);
    log.info("Refresh token expiration time: {}", expirationTime);

    return JWT.create()
        .withSubject(userId)
        .withIssuedAt(now)
        .withExpiresAt(expirationTime)
        .sign(Algorithm.HMAC256(refreshSecret));
  }

  public TokensResponse generateTokens(String userId) {
    log.info("Generating tokens for user: {}", userId);
    var user = userService.getById(userId);
    String accessToken = generateAccessToken(user);
    String refreshToken = generateRefreshToken(userId);

    return new TokensResponse(accessToken, refreshToken);
  }

  public TokensResponse refreshTokens(String refreshToken) {
    try {
      log.info("Refreshing tokens using refresh token: {}", refreshToken);
      DecodedJWT decodedJWT =
          JWT.require(Algorithm.HMAC256(refreshSecret)).build().verify(refreshToken);
      String userId = decodedJWT.getSubject();
      UserResponse user = userService.getById(userId);
      String newAccessToken = generateAccessToken(user);
      String newRefreshToken = refreshToken;

      if (decodedJWT.getExpiresAt().getTime() - System.currentTimeMillis()
          < refreshExpiration * 0.1) {
        log.info("Refresh token is close to expiration, generating new refresh token");
        newRefreshToken = generateRefreshToken(userId);
      }

      return new TokensResponse(newAccessToken, newRefreshToken);

    } catch (Exception e) {
      log.error("Token refresh failed for refresh token: {}", refreshToken, e);
      throw new RuntimeException("Invalid refresh token");
    }
  }

  public DecodedJWT decodeAccessToken(String accessToken) {
    try {
      log.info("Decoding access token: {}", accessToken);
      DecodedJWT decodedJWT =
          JWT.require(Algorithm.HMAC256(accessSecret)).build().verify(accessToken);
      log.info("Access token decoded successfully: {}", decodedJWT.getSubject());
      return decodedJWT;
    } catch (Exception e) {
      log.error("Token decoding failed for access token: {}", accessToken, e);
      throw new RuntimeException("Invalid access token");
    }
  }
}
