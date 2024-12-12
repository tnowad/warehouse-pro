package com.warehousepro.dto.response.report;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GetSummaryReportResponse {
  Long totalOrders;
  Long totalInventory;
  Long percentageOfShippedOrders;
  Long unshippedOrders;
}
