package com.warehousepro.config;

import com.warehousepro.repository.RoleRepository;
import com.warehousepro.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationConfig {
  PasswordEncoder passwordEncoder;

  @NonFinal static final String USER_NAME = "user";

  @NonFinal static final String ADMIN_NAME = "admin";

  @Bean
  @Transactional
  ApplicationRunner applicationRunner(
      UserRepository userRepository, RoleRepository roleRepository) {
    log.info("Đang chạy chương trình");

    return args -> {
      //      if (userRepository.findByName(USER_NAME).isEmpty()) {
      //        roleRepository.save(Role.builder()
      //          .name(USER_NAME)
      //          .description("Dành cho user")
      //          .build());
      //
      //
      //        Role adminRole = roleRepository.save(Role.builder()
      //          .name(ADMIN_NAME)
      //          .description("Dành cho admin")
      //          .build());
      //
      //
      //        var roles = new HashSet<Role>();
      //        roles.add(adminRole);
      //
      //        User user = User.builder()
      //          .name(ADMIN_NAME)
      //          .email("admin@gmail.com")
      //          .password(passwordEncoder.encode("admin"))
      //          .roles(roles)
      //          .build();
      //
      //        userRepository.save(user);
      //      }
      //      log.info("chương trình đã chạy xong");
    };
  }
}
