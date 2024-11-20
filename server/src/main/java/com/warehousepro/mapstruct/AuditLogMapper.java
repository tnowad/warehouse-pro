package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.auditlog.CreateAuditLogRequest;
import com.warehousepro.dto.response.auditlog.AuditLogResponse;
import com.warehousepro.entity.AuditLog;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AuditLogMapper {
  AuditLog toAuditLog(CreateAuditLogRequest request);

  AuditLogResponse toAuditLogResponse(AuditLog auditLog);
}
