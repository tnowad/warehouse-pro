package com.warehousepro.service;

import com.warehousepro.dto.request.auth.CreateUserRequest;
import com.warehousepro.dto.response.auth.UserResponse;
import com.warehousepro.entity.User;
import com.warehousepro.exception.ValidationException;
import com.warehousepro.mapstruct.UserMapper;
import com.warehousepro.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class UserService {

  UserRepository userRepository;
  UserMapper userMapper;
  final PasswordEncoder passwordEncoder;

  @Transactional
  public UserResponse createUser(CreateUserRequest request) {
    if (userRepository.findByEmail(request.getEmail()).isPresent()) {
      throw new ValidationException(Map.of("email", List.of("Email has been used")),
          "User already exists");
    }

    User user = User.builder().email(request.getEmail()).name(request.getName())
        .password(passwordEncoder.encode(request.getPassword())).build();

    return userMapper.toUserResponse(userRepository.save(user));
  }

  public UserResponse getUser(String id) {
    User user =
        userRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy id"));
    return userMapper.toUserResponse(user);
  }

  public List<UserResponse> getUsers() {
    return userRepository.findAll().stream().map(userMapper::toUserResponse).toList();
  }

  public User getUserByEmail(String email) {
    return userRepository.findByEmail(email).orElse(null);
  }

  public User getUserById(String id) {
    return userRepository.findById(id).orElse(null);
  }

}
