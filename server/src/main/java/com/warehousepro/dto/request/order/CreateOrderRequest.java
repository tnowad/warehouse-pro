package com.warehousepro.dto.request.order;

import com.warehousepro.entity.OrderItem;
import com.warehousepro.enums.OrderStatus;
import com.warehousepro.enums.PaymentStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateOrderRequest {

  @NotNull
  @Enumerated(EnumType.STRING)
  OrderStatus status;

  @NotNull
  @Enumerated(EnumType.STRING)
  PaymentStatus paymentStatus;

  @NotBlank
  String shippingAddress;

  @NotEmpty
  @Size(min = 1)
  Set<CreateOrderItemRequest> items = new HashSet<>();


}
