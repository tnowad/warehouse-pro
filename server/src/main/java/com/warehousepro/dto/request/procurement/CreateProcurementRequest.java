package com.warehousepro.dto.request.procurement;

import com.warehousepro.dto.request.procurement.item.CreateProcurementItemRequest;
import com.warehousepro.entity.ProcurementStatus;
import com.warehousepro.entity.Supplier;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import java.util.Date;
import java.util.List;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateProcurementRequest {

  @NotNull(message = "Order date cannot be null")
  @PastOrPresent(message = "Order date cannot be in the future")
  Date orderDate;

  @NotNull(message = "Delivery date cannot be null")
  @Future(message = "Delivery date must be in the future")
  Date deliveryDate;

  ProcurementStatus status;
  Double totalCost;

  @NotNull
  String supplierId;

  @NotEmpty(message = "Procurement items cannot be empty")
  List<CreateProcurementItemRequest> items;
}
