package com.warehousepro.dto.response.auditlog;

import com.warehousepro.entity.User;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuditLogResponse {
  String id;
  String tableName;
  String action;
  String recordId;
  Date changeDate;
  String detail;
  User user;
}
