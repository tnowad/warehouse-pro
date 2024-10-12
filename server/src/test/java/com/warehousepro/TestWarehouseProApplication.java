package com.warehousepro;

import org.springframework.boot.SpringApplication;

public class TestWarehouseProApplication {

  public static void main(String[] args) {
    SpringApplication.from(WarehouseProApplication::main).with(TestcontainersConfiguration.class)
        .run(args);
  }

}
