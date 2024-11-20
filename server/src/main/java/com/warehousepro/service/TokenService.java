package com.warehousepro.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.warehousepro.dto.response.auth.TokensResponse;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.StringJoiner;

import com.warehousepro.entity.Permission;
import com.warehousepro.entity.Role;
import com.warehousepro.entity.User;
import com.warehousepro.repository.PermissionRepository;
import com.warehousepro.repository.RoleRepository;
import com.warehousepro.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TokenService {
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final PermissionRepository permissionRepository;
  String accessSecret = "accessSecret";
  String refreshSecret = "refreshSecret";
  long accessExpiration = 1000 * 60 * 60 * 24;
  long refreshExpiration = 1000 * 60 * 60 * 24 * 30;

  public String generateAccessToken(User user) {
    Date now = new Date();
    Date expirationTime = new Date(now.getTime() + accessExpiration);


    return JWT.create()
        .withSubject(user.getId())
        .withIssuedAt(now)
        .withExpiresAt(expirationTime)
      .withClaim("scope" , buildScope(user))
        .sign(Algorithm.HMAC256(accessSecret));
  }

  private String buildScope(User user) {
    StringJoiner stringJoiner = new StringJoiner(" ");
    Set<Role> roles = roleRepository.findRolesByUsersId(user.getId());
    if (!CollectionUtils.isEmpty(roles))
      roles.forEach(role -> {
          stringJoiner.add("ROLE_" + role.getName());
          Set<Permission> permissions = permissionRepository.findPermissonsByRoles_Name(role.getName());
          if (!CollectionUtils.isEmpty(permissions))
          permissions.forEach(permission -> stringJoiner.add(permission.getName()));
      });

    return stringJoiner.toString();

  }


  public String generateRefreshToken(String userId) {
    Date now = new Date();
    Date expirationTime = new Date(now.getTime() + refreshExpiration);

    return JWT.create()
        .withSubject(userId)
        .withIssuedAt(now)
        .withExpiresAt(expirationTime)
        .sign(Algorithm.HMAC256(refreshSecret));
  }

  public TokensResponse generateTokens(String userId) {
    User user = userRepository.getById(userId);
    String accessToken = generateAccessToken(user);
    String refreshToken = generateRefreshToken(userId);

    return new TokensResponse(accessToken, refreshToken);
  }

  public TokensResponse refreshTokens(String refreshToken) {
    try {
      DecodedJWT decodedJWT =
          JWT.require(Algorithm.HMAC256(refreshSecret)).build().verify(refreshToken);
      String userId = decodedJWT.getSubject();
      User user = userRepository.getById(userId);
      String newAccessToken = generateAccessToken(user);
      String newRefreshToken = refreshToken;

      if (decodedJWT.getExpiresAt().getTime() - System.currentTimeMillis()
          < refreshExpiration * 0.1) {
        newRefreshToken = generateRefreshToken(userId);
      }

      return new TokensResponse(newAccessToken, newRefreshToken);

    } catch (Exception e) {
      log.error("Token refresh failed", e);
      throw new RuntimeException("Invalid refresh token");
    }
  }

  public DecodedJWT decodeAccessToken(String accessToken) {
    try {
      log.info("Decoding access token: {}", accessToken);
      return JWT.require(Algorithm.HMAC256(accessSecret)).build().verify(accessToken);
    } catch (Exception e) {
      log.error("Token decoding failed", e);
      throw new RuntimeException("Invalid access token");
    }
  }
}
