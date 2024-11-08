package com.warehousepro.dto.response.returns;

import com.warehousepro.dto.response.order.OrderItemReponse;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReturnResponse {
  String id;
  Date returnDate;
  String reason;
  String status;
  OrderItemReponse orderItem;
}
