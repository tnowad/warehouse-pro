package com.warehousepro.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.warehousepro.dto.response.auth.TokensResponse;
import java.util.Date;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TokenService {
  String accessSecret = "accessSecret";
  String refreshSecret = "refreshSecret";
  long accessExpiration = 1000 * 60 * 60 * 24;
  long refreshExpiration = 1000 * 60 * 60 * 24 * 30;

  public String generateAccessToken(String userId) {
    Date now = new Date();
    Date expirationTime = new Date(now.getTime() + accessExpiration);

    return JWT.create()
        .withSubject(userId)
        .withIssuedAt(now)
        .withExpiresAt(expirationTime)
        .sign(Algorithm.HMAC256(accessSecret));
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
    String accessToken = generateAccessToken(userId);
    String refreshToken = generateRefreshToken(userId);

    return new TokensResponse(accessToken, refreshToken);
  }

  public TokensResponse refreshTokens(String refreshToken) {
    try {
      DecodedJWT decodedJWT =
          JWT.require(Algorithm.HMAC256(refreshSecret)).build().verify(refreshToken);
      String userId = decodedJWT.getSubject();

      String newAccessToken = generateAccessToken(userId);
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
