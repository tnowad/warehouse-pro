package com.warehousepro.repository;

import com.warehousepro.entity.Order;
import com.warehousepro.enums.OrderStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository
    extends JpaRepository<Order, String>, JpaSpecificationExecutor<Order> {
  long countByStatus(OrderStatus status);
}
