package com.warehousepro.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.warehousepro.dto.response.report.*;
import com.warehousepro.service.ReportService;

@RestController
@RequestMapping("/reports")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReportController {
  ReportService reportService;

  @GetMapping("/summary")
  public ResponseEntity<GetSummaryReportResponse> getSummary() {
    return ResponseEntity.ok(reportService.getSummaryReport());
  }
}
