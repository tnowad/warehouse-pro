package com.warehousepro.dto.response.procurement;

import java.util.Date;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProcurementResponse {
  String id;
  Date orderDate;
  Date deliveryDate;
  String status;
  Double totalCost;
  Date createdAt;
  String supplierId;
}
