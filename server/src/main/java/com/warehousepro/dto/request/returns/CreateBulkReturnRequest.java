package com.warehousepro.dto.request.returns;

import com.warehousepro.entity.ReturnStatus;
import java.util.Date;
import java.util.Set;
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
public class CreateBulkReturnRequest {
  Set<String> orderItemIds;
  Date returnDate;
  String reason;
  ReturnStatus status;
}
