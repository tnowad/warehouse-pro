package com.warehousepro.dto.request.procurement;


import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

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
}
