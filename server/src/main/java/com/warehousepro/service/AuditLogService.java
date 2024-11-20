package com.warehousepro.service;

import com.warehousepro.dto.request.auditlog.CreateAuditLogRequest;
import com.warehousepro.entity.AuditLog;
import com.warehousepro.mapstruct.AuditLogMapper;
import com.warehousepro.repository.AuditLogRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AuditLogService {
  AuditLogRepository auditLogRepository;
  AuditLogMapper auditLogMapper;

  @Transactional
  public AuditLog create(CreateAuditLogRequest request) {
    AuditLog auditLog = auditLogMapper.toAuditLog(request);
    auditLogRepository.save(auditLog);
    return auditLog;
  }

  public List<AuditLog> getAll() {
    return auditLogRepository.findAll();
  }
}
