package com.warehousepro.dto.response.procurement.item;

import com.warehousepro.dto.response.procurement.ProcurementReponse;
import com.warehousepro.dto.response.product.ProductResponse;
import com.warehousepro.dto.response.warehouse.WareHouseResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProcurementItemResponse {
  String id;
  Integer quantity;
  Double price;
  WareHouseResponse warehouse;
  ProductResponse product;
  ProcurementReponse procurement;
}
