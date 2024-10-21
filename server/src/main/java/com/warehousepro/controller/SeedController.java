package com.warehousepro.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.warehousepro.service.SeedService;

import lombok.AllArgsConstructor;

@RequestMapping("/seeds")
@RestController
@AllArgsConstructor
public class SeedController {

  final SeedService seedService;

  @PostMapping("/clear")
  public ResponseEntity<?> clear() {
    try {
      seedService.clearSeeds();
      return ResponseEntity.ok().build();
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @PostMapping("/default")
  public ResponseEntity<?> defaultSeed() {
    try {
      seedService.defaultSeed();
      return ResponseEntity.ok().build();
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @PostMapping("/mock")
  public ResponseEntity<?> mockSeed() {
    try {
      seedService.mockSeeds();
      return ResponseEntity.ok().build();
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }
}
