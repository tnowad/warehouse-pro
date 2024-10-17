package com.warehousepro.service;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.warehousepro.dto.request.auth.LoginRequest;
import com.warehousepro.dto.response.auth.LoginResponse;
import com.warehousepro.dto.response.auth.TokensResponse;
import com.warehousepro.entity.User;
import com.warehousepro.mapstruct.UserMapper;
import com.warehousepro.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {

  UserRepository userRepository;
  PasswordEncoder passwordEncoder;
  UserMapper userMapper;

  @NonFinal
  @Value("${jwt.signerKey}")
  protected String SIGNER_KEY;

  public User authenticate(String email, String password) {
    User user = userRepository.findByEmail(email).orElseThrow(() -> {
      log.warn("User not found for email: {}", email);
      throw new Error("User not found");
    });

    if (!passwordEncoder.matches(password, user.getPassword())) {
      log.warn("Password mismatch for email: {}", email);
      throw new Error("Password mismatch");
    }

    return user;
  }

  public LoginResponse login(LoginRequest loginRequest) {
    try {
      User user = authenticate(loginRequest.getEmail(), loginRequest.getPassword());
      String accessToken = generateAccessToken(user);
      String refreshToken = generateRefreshToken(user);

      return LoginResponse.builder().user(userMapper.toUserResponse(user))
          .tokens(
              TokensResponse.builder().accessToken(accessToken).refreshToken(refreshToken).build())
          .build();

    } catch (JOSEException e) {
      throw new RuntimeException("Error while generating token");
    } catch (RuntimeException e) {
      throw new RuntimeException("Error while authenticating user");
    }
  }

  private String generateAccessToken(User user) throws JOSEException {
    return generateToken(user, 5 * 60);
  }

  private String generateRefreshToken(User user) throws JOSEException {
    return generateToken(user, 30 * 24 * 60 * 60);
  }

  private String generateToken(User user, long expirationInSeconds) throws JOSEException {
    JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);

    JWTClaimsSet jwtClaimsSet =
        new JWTClaimsSet.Builder().subject(user.getUsername()).issueTime(new Date())
            .expirationTime(new Date(
                Instant.now().plus(expirationInSeconds, ChronoUnit.SECONDS).toEpochMilli()))
            .build();

    Payload payload = new Payload(jwtClaimsSet.toJSONObject());

    JWSObject jwsObject = new JWSObject(jwsHeader, payload);
    jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));

    return jwsObject.serialize();
  }
}
