package com.warehousepro.dto.request.returns;

import com.warehousepro.entity.ReturnStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateReturnRequest {
  Date returnDate;
  String reason;
  String status;
}
