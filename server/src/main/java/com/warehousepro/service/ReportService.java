package com.warehousepro.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import com.warehousepro.dto.response.report.GetSummaryReportResponse;
import com.warehousepro.entity.ShipmentStatus;
import com.warehousepro.repository.InventoryRepository;
import com.warehousepro.repository.OrderRepository;
import com.warehousepro.repository.ShipmentRepository;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ReportService {
  OrderRepository orderRepository;
  InventoryRepository inventoryRepository;
  ShipmentRepository shipmentRepository;

  public GetSummaryReportResponse getSummaryReport() {
    long totalOrders = orderRepository.count();
    long totalInventory = inventoryRepository.count();
    long shippedShipments = shipmentRepository.countByStatus(ShipmentStatus.SHIPPED);
    long pendingShipments = shipmentRepository.countByStatus(ShipmentStatus.PENDING);
    long deliveredShipments = shipmentRepository.countByStatus(ShipmentStatus.DELIVERED);
    long totalShipments = shippedShipments + pendingShipments + deliveredShipments;
    long calculatePercentageOfShippedOrders = (shippedShipments * 100) / totalShipments;

    return new GetSummaryReportResponse(
        totalOrders,
        totalInventory,
        calculatePercentageOfShippedOrders,
        100 - calculatePercentageOfShippedOrders);
  }
}
