package com.warehousepro.config;

import com.auth0.jwt.RegisteredClaims;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.warehousepro.service.TokenService;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class CustomJwtDecoder implements JwtDecoder {

  TokenService tokenService;

  public Jwt decode(String token) throws JwtException {
    try {
      log.debug("Attempting to decode JWT token");

      DecodedJWT decoded = tokenService.decodeAccessToken(token);

      Instant issuedAt =
          decoded.getIssuedAt() != null ? decoded.getIssuedAt().toInstant() : Instant.MIN;
      Instant expiresAt =
          decoded.getExpiresAt() != null ? decoded.getExpiresAt().toInstant() : Instant.MAX;
      Instant notBefore =
          decoded.getNotBefore() != null ? decoded.getNotBefore().toInstant() : Instant.MIN;

      Map<String, Object> claims =
          decoded.getClaims().entrySet().stream()
              .collect(Collectors.toMap(Map.Entry::getKey, e -> e.getValue().as(Object.class)));

      claims.put(RegisteredClaims.ISSUED_AT, issuedAt);
      claims.put(RegisteredClaims.EXPIRES_AT, expiresAt);
      claims.put(RegisteredClaims.NOT_BEFORE, notBefore);

      Map<String, Object> headerClaims = new HashMap<>();
      headerClaims.put("kid", decoded.getKeyId());
      headerClaims.put("alg", decoded.getAlgorithm());
      headerClaims.put("cty", decoded.getContentType());
      headerClaims.put("typ", decoded.getType());

      log.debug("JWT decoded successfully with claims: {}", claims);

      return new Jwt(token, issuedAt, expiresAt, headerClaims, claims);
    } catch (TokenExpiredException expired) {
      log.warn("Token expired: {}", expired.getMessage());
      throw new JwtException("Token expired: " + expired.getMessage(), expired);
    } catch (JWTVerificationException invalid) {
      log.warn("JWT verification failed: {}", invalid.getMessage());
      throw new JwtException("JWT verification failed: " + invalid.getMessage(), invalid);
    } catch (Exception e) {
      log.debug("JWT decoding failed: {}", e.getMessage());
      throw new JwtException("JWT decoding failed: " + e.getMessage(), e);
    }
  }
}
