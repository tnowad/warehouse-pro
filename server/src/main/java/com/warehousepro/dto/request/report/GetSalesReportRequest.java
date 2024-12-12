package com.warehousepro.dto.request.report;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GetSalesReportRequest {

  @DateTimeFormat(pattern = "yyyy-MM-dd")
  Date startDate;

  @DateTimeFormat(pattern = "yyyy-MM-dd")
  Date endDate;
}
