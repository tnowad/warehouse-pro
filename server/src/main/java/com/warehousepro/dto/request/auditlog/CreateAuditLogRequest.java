package com.warehousepro.dto.request.auditlog;

import com.warehousepro.entity.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateAuditLogRequest {
  String tableName;
  String action;
  String detail;
  User user;
}
