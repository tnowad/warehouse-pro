package com.warehousepro.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.warehousepro.entity.User;
import com.warehousepro.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SeedService {

  final UserRepository userRepository;
  final BCryptPasswordEncoder passwordEncoder;

  @Transactional
  public void clearSeeds() {
    userRepository.deleteAllInBatch();
  }

  @Transactional
  public void defaultSeed() {
    // TODO: Seed permissions
    // Seed: roles
    // Seed: users
    User[] users = {
        User.builder()
            .email("admin@warehouse-pro.com")
            .name("Admin").password(passwordEncoder.encode("Password@123"))
            .build()
    };
    for (User user : users) {
      userRepository.save(user);
    }
  }

  @Transactional
  public void mockSeeds() {

  }
}
