package com.warehousepro.service;

import com.warehousepro.entity.*;
import com.warehousepro.enums.OrderStatus;
import com.warehousepro.enums.PaymentStatus;
import com.warehousepro.repository.InventoryRepository;
import com.warehousepro.repository.OrderItemRepository;
import com.warehousepro.repository.OrderRepository;
import com.warehousepro.repository.PermissionRepository;
import com.warehousepro.repository.ProcurementItemRepository;
import com.warehousepro.repository.ProcurementRepository;
import com.warehousepro.repository.ProductRepository;
import com.warehousepro.repository.ReturnRepository;
import com.warehousepro.repository.RoleRepository;
import com.warehousepro.repository.ShipmentItemRepository;
import com.warehousepro.repository.ShipmentRepository;
import com.warehousepro.repository.ShipmentTrackingRepository;
import com.warehousepro.repository.SupplierProductRepository;
import com.warehousepro.repository.SupplierRepository;
import com.warehousepro.repository.UserRepository;
import com.warehousepro.repository.WareHouseRepository;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import net.datafaker.Faker;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class SeedService {

  UserRepository userRepository;
  InventoryRepository inventoryRepository;
  OrderRepository orderRepository;
  OrderItemRepository orderItemRepository;
  ProcurementRepository procurementRepository;
  ProcurementItemRepository procurementItemRepository;
  ReturnRepository returnRepository;
  ShipmentRepository shipmentRepository;
  ShipmentItemRepository shipmentItemRepository;
  ShipmentTrackingRepository shipmentTrackingRepository;
  SupplierRepository supplierRepository;
  SupplierProductRepository supplierProductRepository;
  RoleRepository roleRepository;
  WareHouseRepository wareHouseRepository;
  PermissionRepository permissionRepository;
  BCryptPasswordEncoder passwordEncoder;
  ProductRepository productRepository;
  Faker faker = new Faker();

  @Transactional
  public void clearSeeds() {
    shipmentItemRepository.deleteAllInBatch();
    shipmentRepository.deleteAllInBatch();
    shipmentTrackingRepository.deleteAllInBatch();
    returnRepository.deleteAllInBatch();
    procurementItemRepository.deleteAllInBatch();
    procurementRepository.deleteAllInBatch();
    supplierProductRepository.deleteAllInBatch();
    supplierRepository.deleteAllInBatch();
    inventoryRepository.deleteAllInBatch();
    orderItemRepository.deleteAllInBatch();
    orderRepository.deleteAllInBatch();
    userRepository.deleteAllInBatch();
    permissionRepository.deleteAllInBatch();
    roleRepository.deleteAllInBatch();
    wareHouseRepository.deleteAllInBatch();
    productRepository.deleteAllInBatch();
  }

  @Transactional
  public void defaultSeed() {
    Map<PermissionName, Permission> permissions = new HashMap<>();

    permissions.put(
        PermissionName.AUTH_LOGIN,
        Permission.builder()
            .name(PermissionName.AUTH_LOGIN)
            .description("Login to the system")
            .build());

    permissions.put(
        PermissionName.USER_CREATE,
        Permission.builder()
            .name(PermissionName.USER_CREATE)
            .description("Create a new user")
            .build());
    permissions.put(
        PermissionName.USER_UPDATE,
        Permission.builder()
            .name(PermissionName.USER_UPDATE)
            .description("Update an existing user")
            .build());
    permissions.put(
        PermissionName.USER_DELETE,
        Permission.builder().name(PermissionName.USER_DELETE).description("Delete a user").build());
    permissions.put(
        PermissionName.USER_LIST,
        Permission.builder().name(PermissionName.USER_LIST).description("List all users").build());
    permissions.put(
        PermissionName.ROLE_CREATE,
        Permission.builder()
            .name(PermissionName.ROLE_CREATE)
            .description("Create a new role")
            .build());
    permissions.put(
        PermissionName.ROLE_UPDATE,
        Permission.builder()
            .name(PermissionName.ROLE_UPDATE)
            .description("Update an existing role")
            .build());
    permissions.put(
        PermissionName.ROLE_DELETE,
        Permission.builder().name(PermissionName.ROLE_DELETE).description("Delete a role").build());
    permissions.put(
        PermissionName.ROLE_LIST,
        Permission.builder().name(PermissionName.ROLE_LIST).description("List all roles").build());
    permissions.put(
        PermissionName.PERMISSION_ASSIGN,
        Permission.builder()
            .name(PermissionName.PERMISSION_ASSIGN)
            .description("Assign permissions to roles")
            .build());
    permissions.put(
        PermissionName.PERMISSION_REVOKE,
        Permission.builder()
            .name(PermissionName.PERMISSION_REVOKE)
            .description("Revoke permissions from roles")
            .build());
    permissions.put(
        PermissionName.INVENTORY_TRACK,
        Permission.builder()
            .name(PermissionName.INVENTORY_TRACK)
            .description("Track inventory levels")
            .build());
    permissions.put(
        PermissionName.INVENTORY_PRODUCT_CREATE,
        Permission.builder()
            .name(PermissionName.INVENTORY_PRODUCT_CREATE)
            .description("Create a new product in inventory")
            .build());
    permissions.put(
        PermissionName.INVENTORY_PRODUCT_UPDATE,
        Permission.builder()
            .name(PermissionName.INVENTORY_PRODUCT_UPDATE)
            .description("Update an existing product in inventory")
            .build());
    permissions.put(
        PermissionName.INVENTORY_PRODUCT_DELETE,
        Permission.builder()
            .name(PermissionName.INVENTORY_PRODUCT_DELETE)
            .description("Delete a product from inventory")
            .build());
    permissions.put(
        PermissionName.INVENTORY_PRODUCT_LIST,
        Permission.builder()
            .name(PermissionName.INVENTORY_PRODUCT_LIST)
            .description("List all products in inventory")
            .build());
    permissions.put(
        PermissionName.INVENTORY_LOW_STOCK_ALERT,
        Permission.builder()
            .name(PermissionName.INVENTORY_LOW_STOCK_ALERT)
            .description("Receive low stock alerts")
            .build());
    permissions.put(
        PermissionName.ORDER_CREATE,
        Permission.builder()
            .name(PermissionName.ORDER_CREATE)
            .description("Create a new order")
            .build());
    permissions.put(
        PermissionName.ORDER_UPDATE,
        Permission.builder()
            .name(PermissionName.ORDER_UPDATE)
            .description("Update an existing order")
            .build());
    permissions.put(
        PermissionName.ORDER_DELETE,
        Permission.builder()
            .name(PermissionName.ORDER_DELETE)
            .description("Delete an order")
            .build());
    permissions.put(
        PermissionName.ORDER_SEARCH,
        Permission.builder()
            .name(PermissionName.ORDER_SEARCH)
            .description("Search for orders")
            .build());
    permissions.put(
        PermissionName.ORDER_LIST,
        Permission.builder()
            .name(PermissionName.ORDER_LIST)
            .description("List all orders")
            .build());
    permissions.put(
        PermissionName.ORDER_STATUS_TRACK,
        Permission.builder()
            .name(PermissionName.ORDER_STATUS_TRACK)
            .description("Track order status")
            .build());
    permissions.put(
        PermissionName.ORDER_ASSIGN_SHIPMENT,
        Permission.builder()
            .name(PermissionName.ORDER_ASSIGN_SHIPMENT)
            .description("Assign a shipment to an order")
            .build());
    permissions.put(
        PermissionName.WAREHOUSE_CREATE,
        Permission.builder()
            .name(PermissionName.WAREHOUSE_CREATE)
            .description("Create a new warehouse")
            .build());
    permissions.put(
        PermissionName.WAREHOUSE_UPDATE,
        Permission.builder()
            .name(PermissionName.WAREHOUSE_UPDATE)
            .description("Update an existing warehouse")
            .build());
    permissions.put(
        PermissionName.WAREHOUSE_DELETE,
        Permission.builder()
            .name(PermissionName.WAREHOUSE_DELETE)
            .description("Delete a warehouse")
            .build());
    permissions.put(
        PermissionName.WAREHOUSE_SEARCH,
        Permission.builder()
            .name(PermissionName.WAREHOUSE_SEARCH)
            .description("Search for warehouses")
            .build());
    permissions.put(
        PermissionName.WAREHOUSE_LIST,
        Permission.builder()
            .name(PermissionName.WAREHOUSE_LIST)
            .description("List all warehouses")
            .build());
    permissions.put(
        PermissionName.WAREHOUSE_INVENTORY_DISTRIBUTE,
        Permission.builder()
            .name(PermissionName.WAREHOUSE_INVENTORY_DISTRIBUTE)
            .description("Distribute inventory in the warehouse")
            .build());
    permissions.put(
        PermissionName.WAREHOUSE_SPACE_OPTIMIZE,
        Permission.builder()
            .name(PermissionName.WAREHOUSE_SPACE_OPTIMIZE)
            .description("Optimize warehouse space")
            .build());
    permissions.put(
        PermissionName.PROCUREMENT_SUPPLIER_CREATE,
        Permission.builder()
            .name(PermissionName.PROCUREMENT_SUPPLIER_CREATE)
            .description("Create a new supplier")
            .build());
    permissions.put(
        PermissionName.PROCUREMENT_SUPPLIER_UPDATE,
        Permission.builder()
            .name(PermissionName.PROCUREMENT_SUPPLIER_UPDATE)
            .description("Update an existing supplier")
            .build());
    permissions.put(
        PermissionName.PROCUREMENT_SUPPLIER_DELETE,
        Permission.builder()
            .name(PermissionName.PROCUREMENT_SUPPLIER_DELETE)
            .description("Delete a supplier")
            .build());
    permissions.put(
        PermissionName.PROCUREMENT_SUPPLIER_SEARCH,
        Permission.builder()
            .name(PermissionName.PROCUREMENT_SUPPLIER_SEARCH)
            .description("Search for suppliers")
            .build());
    permissions.put(
        PermissionName.PROCUREMENT_SUPPLIER_LIST,
        Permission.builder()
            .name(PermissionName.PROCUREMENT_SUPPLIER_LIST)
            .description("List all suppliers")
            .build());
    permissions.put(
        PermissionName.PROCUREMENT_ORDER_CREATE,
        Permission.builder()
            .name(PermissionName.PROCUREMENT_ORDER_CREATE)
            .description("Create a new procurement order")
            .build());
    permissions.put(
        PermissionName.PROCUREMENT_ORDER_UPDATE,
        Permission.builder()
            .name(PermissionName.PROCUREMENT_ORDER_UPDATE)
            .description("Update an existing procurement order")
            .build());
    permissions.put(
        PermissionName.PROCUREMENT_ORDER_DELETE,
        Permission.builder()
            .name(PermissionName.PROCUREMENT_ORDER_DELETE)
            .description("Delete a procurement order")
            .build());
    permissions.put(
        PermissionName.PROCUREMENT_ORDER_SEARCH,
        Permission.builder()
            .name(PermissionName.PROCUREMENT_ORDER_SEARCH)
            .description("Search for procurement orders")
            .build());
    permissions.put(
        PermissionName.PROCUREMENT_ORDER_LIST,
        Permission.builder()
            .name(PermissionName.PROCUREMENT_ORDER_LIST)
            .description("List all procurement orders")
            .build());
    permissions.put(
        PermissionName.PROCUREMENT_ORDER_STATUS_TRACK,
        Permission.builder()
            .name(PermissionName.PROCUREMENT_ORDER_STATUS_TRACK)
            .description("Track procurement order status")
            .build());
    permissions.put(
        PermissionName.SHIPMENT_CREATE,
        Permission.builder()
            .name(PermissionName.SHIPMENT_CREATE)
            .description("Create a new shipment")
            .build());
    permissions.put(
        PermissionName.SHIPMENT_UPDATE,
        Permission.builder()
            .name(PermissionName.SHIPMENT_UPDATE)
            .description("Update an existing shipment")
            .build());
    permissions.put(
        PermissionName.SHIPMENT_DELETE,
        Permission.builder()
            .name(PermissionName.SHIPMENT_DELETE)
            .description("Delete a shipment")
            .build());
    permissions.put(
        PermissionName.SHIPMENT_SEARCH,
        Permission.builder()
            .name(PermissionName.SHIPMENT_SEARCH)
            .description("Search for shipments")
            .build());
    permissions.put(
        PermissionName.SHIPMENT_LIST,
        Permission.builder()
            .name(PermissionName.SHIPMENT_LIST)
            .description("List all shipments")
            .build());
    permissions.put(
        PermissionName.SHIPMENT_TRACKING_VIEW,
        Permission.builder()
            .name(PermissionName.SHIPMENT_TRACKING_VIEW)
            .description("View shipment tracking details")
            .build());
    permissions.put(
        PermissionName.RETURN_CREATE,
        Permission.builder()
            .name(PermissionName.RETURN_CREATE)
            .description("Create a return request")
            .build());
    permissions.put(
        PermissionName.RETURN_UPDATE,
        Permission.builder()
            .name(PermissionName.RETURN_UPDATE)
            .description("Update a return request")
            .build());
    permissions.put(
        PermissionName.RETURN_DELETE,
        Permission.builder()
            .name(PermissionName.RETURN_DELETE)
            .description("Delete a return request")
            .build());
    permissions.put(
        PermissionName.RETURN_SEARCH,
        Permission.builder()
            .name(PermissionName.RETURN_SEARCH)
            .description("Search for return requests")
            .build());
    permissions.put(
        PermissionName.RETURN_LIST,
        Permission.builder()
            .name(PermissionName.RETURN_LIST)
            .description("List all return requests")
            .build());
    permissions.forEach(
        (key, permission) -> {
          if (permissionRepository.findByName(permission.getName()) == null) {
            var permissionSaved = permissionRepository.save(permission);
            permissions.put(key, permissionSaved);
          }
        });

    log.info("permissions: {}", permissions);
    Role adminRole =
        roleRepository
            .findById("ADMIN")
            .orElse(
                Role.builder()
                    .name("ADMIN")
                    .description("Admin role")
                    .permissions(new HashSet<>(permissions.values()))
                    .build());

    roleRepository.save(adminRole);
    Role managerRole =
        roleRepository
            .findById("MANAGER")
            .orElse(
                Role.builder()
                    .name("MANAGER")
                    .description("Manager role")
                    .permissions(new HashSet<>(permissions.values()))
                    .build());

    roleRepository.save(managerRole);

    Role employeeRole =
        roleRepository
            .findById("EMPLOYEE")
            .orElse(
                Role.builder()
                    .name("EMPLOYEE")
                    .description("Employee role")
                    .permissions(new HashSet<>(permissions.values()))
                    .build());

    roleRepository.save(employeeRole);
    List<User> users =
        List.of(
            User.builder()
                .email("admin@warehouse-pro.com")
                .name("Admin")
                .password(passwordEncoder.encode("Password@123"))
                .roles(new HashSet<>(Set.of(adminRole)))
                .build(),
            User.builder()
                .email("manager@warehouse-pro.com")
                .name("Manager")
                .password(passwordEncoder.encode("Password@123"))
                .roles(new HashSet<>(Set.of(managerRole)))
                .build(),
            User.builder()
                .email("employee@warehouse-pro.com")
                .name("Employee")
                .password(passwordEncoder.encode("Password@123"))
                .roles(new HashSet<>(Set.of(employeeRole)))
                .build());

    userRepository.saveAll(users);
  }

  @Transactional
  public void mockSeeds() {
    List<Warehouse> warehouses = new ArrayList<>();
    List<Product> products = new ArrayList<>();
    for (int i = 0; i < 63; i++) {
      warehouses.add(
          Warehouse.builder()
              .name(faker.company().name())
              .location(faker.address().fullAddress())
              .capacity(faker.number().numberBetween(0, 3000))
              .build());
    }

    for (int i = 0; i < 63; i++) {
      products.add(
          Product.builder()
              .name(faker.commerce().productName())
              .price(Double.parseDouble(faker.commerce().price()))
              .description(faker.lorem().sentence())
              .sku(faker.number().digits(10))
              .build());
    }

    productRepository.saveAll(products);
    wareHouseRepository.saveAll(warehouses);

    List<Inventory> inventories = new ArrayList<>();

    for (var warehouse : warehouses) {
      for (var product : products) {
        inventories.add(
            Inventory.builder()
                .warehouse(warehouse)
                .product(product)
                .quantity(faker.number().numberBetween(0, 100))
                .status(InventoryStatus.ACTIVE)
                .minimumStockLevel(faker.number().numberBetween(0, 10))
                .price(faker.number().numberBetween(0, 10))
                .build());
      }
    }

    inventoryRepository.saveAll(inventories);

    List<Supplier> suppliers = new ArrayList<>();
    for (int i = 0; i < 63; i++) {
      suppliers.add(
          Supplier.builder()
              .name(faker.company().name())
              .contact(faker.phoneNumber().cellPhone())
              .build());
    }
    supplierRepository.saveAll(suppliers);
    List<Order> orders = new ArrayList<>();

    for (int i = 0; i < 63; i++) {
      List<OrderItem> orderItems = new ArrayList<>();

      for (int j = 0; j < 5; j++) {
        orderItems.add(
            OrderItem.builder()
                .quantity(faker.number().numberBetween(0, 10))
                .price(faker.number().randomDouble(2, 0, 1000))
                .totalPrice(faker.number().randomDouble(2, 0, 1000))
                .discount(faker.number().randomDouble(2, 0, 1000))
                .build());
      }

      orders.add(
          Order.builder()
              .status(OrderStatus.values()[faker.number().numberBetween(0, 3)])
              .totalAmount(faker.number().randomDouble(2, 0, 1000))
              .paymentStatus(PaymentStatus.values()[faker.number().numberBetween(0, 3)])
              .shippingAddress(faker.address().fullAddress())
              .orderItems(new HashSet<>(orderItems))
              .build());
    }

    orderRepository.saveAll(orders);
  }
}
