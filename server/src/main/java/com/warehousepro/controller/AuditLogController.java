package com.warehousepro.controller;

import com.warehousepro.dto.request.auditlog.CreateAuditLogRequest;
import com.warehousepro.dto.response.auditlog.AuditLogResponse;
import com.warehousepro.entity.AuditLog;
import com.warehousepro.mapstruct.AuditLogMapper;
import com.warehousepro.service.AuditLogService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/audit-logs")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuditLogController {
  AuditLogService auditLogService;
  AuditLogMapper auditLogMapper;

  @PostMapping
  public ResponseEntity<AuditLogResponse>  create(@RequestBody CreateAuditLogRequest request){
    return ResponseEntity.ok(auditLogMapper.toAuditLogResponse(auditLogService.create(request)));
  }

  @GetMapping
  public ResponseEntity<List<AuditLog>> getALl(){
    return ResponseEntity.ok(auditLogService.getAll());
  }

  


}
