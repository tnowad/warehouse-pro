package com.warehousepro.dto.response.procurement.item;


import com.warehousepro.dto.response.procurement.ProcurementReponse;
import com.warehousepro.dto.response.product.ProductResponse;
import com.warehousepro.dto.response.warehouse.WareHouseResponseDto;
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
  WareHouseResponseDto warehouse;
  ProductResponse product;
  ProcurementReponse procurement;
}
