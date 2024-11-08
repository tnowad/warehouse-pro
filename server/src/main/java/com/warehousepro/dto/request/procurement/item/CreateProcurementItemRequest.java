package com.warehousepro.dto.request.procurement.item;

import com.warehousepro.entity.Procurement;
import com.warehousepro.entity.Product;
import com.warehousepro.entity.Warehouse;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateProcurementItemRequest {
  Integer quantity;
  Double price;
  Warehouse warehouse;
  Product product;
  Procurement procurement;
}
