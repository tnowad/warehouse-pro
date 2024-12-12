package com.warehousepro.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.warehousepro.dto.request.report.GetSalesReportRequest;
import com.warehousepro.dto.response.report.GetSalesReportResponse;
import com.warehousepro.dto.response.report.GetSummaryReportResponse;
import com.warehousepro.entity.ShipmentStatus;
import com.warehousepro.enums.OrderStatus;
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

  public GetSalesReportResponse getSalesReport(GetSalesReportRequest request) {
    Date startDate = request.getStartDate();
    Date endDate = request.getEndDate();
    if (startDate == null || endDate == null) {
      Calendar calendar = Calendar.getInstance();
      endDate = calendar.getTime();
      calendar.add(Calendar.MONTH, -3);
      startDate = calendar.getTime();
    }

    List<GetSalesReportResponse.SalesReportItem> items = orderRepository
        .findAllByCreatedAtBetween(startDate, endDate)
        .stream()
        .filter(order -> order.getStatus().equals(OrderStatus.DELIVERED))
        .map(
            order -> new GetSalesReportResponse.SalesReportItem(
                order.getCreatedAt().toString(), order.getTotalAmount()))
        .toList();

    return new GetSalesReportResponse(items);
  }
}
