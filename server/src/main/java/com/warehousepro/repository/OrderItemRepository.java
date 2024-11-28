package com.warehousepro.repository;

import com.warehousepro.entity.OrderItem;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, String> {

  List<OrderItem> findAllByOrderId(String orderId);
}
