package com.warehousepro.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.warehousepro.config.JwtProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class JwtService {

  private final JwtProperties jwtProperties;

  public String generateAccessToken(String id) throws UnsupportedEncodingException {
    return JWT.create().withSubject(id)
        .withExpiresAt(
            new Date(System.currentTimeMillis() + jwtProperties.getAccess().getExpiration()))
        .withIssuedAt(new Date()).sign(Algorithm.HMAC256(jwtProperties.getAccess().getSecret()));
  }

  public String generateRefreshToken(String id) throws UnsupportedEncodingException {
    return JWT.create().withSubject(id)
        .withExpiresAt(
            new Date(System.currentTimeMillis() + jwtProperties.getRefresh().getExpiration()))
        .withIssuedAt(new Date()).sign(Algorithm.HMAC256(jwtProperties.getRefresh().getSecret()));
  }

  public Map<String, String> validateToken(String token, boolean isAccessToken) {
    Map<String, String> claims = new HashMap<>();
    try {
      String secret = isAccessToken ? jwtProperties.getAccess().getSecret()
          : jwtProperties.getRefresh().getSecret();
      JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secret)).build();
      DecodedJWT decodedJWT = verifier.verify(token);
      claims.put("username", decodedJWT.getSubject());
      claims.put("issuedAt", decodedJWT.getIssuedAt().toString());
      claims.put("expiresAt", decodedJWT.getExpiresAt().toString());
    } catch (Exception e) {
      claims.put("error", "Invalid token");
    }
    return claims;
  }
}
