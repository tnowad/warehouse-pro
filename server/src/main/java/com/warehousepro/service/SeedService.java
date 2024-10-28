package com.warehousepro.service;

import java.util.ArrayList;
import java.util.List;
import com.warehousepro.repository.ProductRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.warehousepro.entity.User;
import com.warehousepro.entity.Warehouse;
import com.warehousepro.repository.UserRepository;
import com.warehousepro.repository.WareHouseRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.datafaker.Faker;

@Service
@AllArgsConstructor
@Slf4j
public class SeedService {

  final UserRepository userRepository;
  final WareHouseRepository wareHouseRepository;
  final BCryptPasswordEncoder passwordEncoder;
  final ProductRepository productRepository;
  final Faker faker = new Faker();

  @Transactional
  public void clearSeeds() {
    wareHouseRepository.deleteAllInBatch();
    userRepository.deleteAllInBatch();
    productRepository.deleteAllInBatch();
  }

  @Transactional
  public void defaultSeed() {
    // TODO: Seed permissions
    // Seed: roles
    // Seed: users
    List<User> users = List.of(User.builder().email("admin@warehouse-pro.com").name("Admin")
        .password(passwordEncoder.encode("Password@123")).build());
    for (User user : users) {
      userRepository.save(user);
    }
  }

  @Transactional
  public void mockSeeds() {
    List<Warehouse> warehouses = new ArrayList<>();
    for (int i = 0; i < 63; i++) {
      warehouses.add(
          Warehouse.builder().name(faker.company().name()).location(faker.address().fullAddress())
              .capacity(faker.number().numberBetween(0, 3000)).build());
    }
    wareHouseRepository.saveAll(warehouses);
  }
}
