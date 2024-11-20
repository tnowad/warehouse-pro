package com.warehousepro.dto.request.procurement;

import com.warehousepro.entity.Supplier;
import java.util.Date;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateProcurementRequest {
  Date orderDate;
  Date deliveryDate;
  String status;
  Double totalCost;
  Supplier supplier;
}
