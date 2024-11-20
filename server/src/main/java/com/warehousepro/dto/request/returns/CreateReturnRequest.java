package com.warehousepro.dto.request.returns;

import com.warehousepro.entity.OrderItem;
import java.util.Date;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateReturnRequest {
  Date returnDate;
  String reason;
  String status;
  OrderItem orderItem;
}
