package com.warehousepro.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import java.io.UnsupportedEncodingException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.warehousepro.dto.request.auth.LoginRequest;
import com.warehousepro.dto.response.auth.LoginResponse;
import com.warehousepro.dto.response.auth.RefreshTokenResponse;
import com.warehousepro.dto.response.auth.TokensResponse;
import com.warehousepro.exception.EmailNotFoundException;
import com.warehousepro.exception.IncorrectPasswordException;
import com.warehousepro.exception.TokenGenerationException;
import com.warehousepro.exception.UserNotFoundException;
import com.warehousepro.mapstruct.UserMapper;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
  private final JwtService jwtService;
  private final UserService userService;
  private final BCryptPasswordEncoder passwordEncoder;
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

      try {
        refreshToken = jwtService.generateRefreshToken(user.getId());
        accessToken = jwtService.generateAccessToken(user.getId());
      } catch (UnsupportedEncodingException e) {
        log.error("Unsupported encoding during token generation for user ID {}: {}", user.getId(),
            e.getMessage());
        throw new TokenGenerationException("Error generating token. Please try again later.", e);
      }

      return LoginResponse.builder().user(userMapper.toUserResponse(user))
          .tokens(new TokensResponse(accessToken, refreshToken)).build();
    } catch (EmailNotFoundException | IncorrectPasswordException e) {
      log.warn("Error while logging in: {}", e.getMessage());
      throw e;
    }
  }

  public RefreshTokenResponse refreshToken(String refreshToken) {
    try {
      var userId = jwtService.extractRefreshUserId(refreshToken);
      if (userId == null) {
        throw new TokenGenerationException("Invalid refresh token");
      }
      var user = userService.getUserById(userId);
      if (user == null) {
        throw new UserNotFoundException("User not found");
      }

      String accessToken;

      try {
        accessToken = jwtService.generateAccessToken(user.getId());
      } catch (UnsupportedEncodingException e) {
        log.error("Unsupported encoding during token generation for user ID {}: {}", user.getId(),
            e.getMessage());
        throw new TokenGenerationException("Error generating token. Please try again later.", e);
      }
      return RefreshTokenResponse.builder().accessToken(accessToken).build();
    } catch (UserNotFoundException e) {
      log.warn("Error while refreshing token: {}", e.getMessage());
      throw e;
    } catch (TokenGenerationException e) {
      log.error("Error while refreshing token: {}", e.getMessage());
      throw e;
    }
  }
}
