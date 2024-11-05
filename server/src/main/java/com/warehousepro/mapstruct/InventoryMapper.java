package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.inventory.CreateInventoryRequest;
import com.warehousepro.dto.response.inventory.InventoryResponse;
import com.warehousepro.entity.Inventory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface InventoryMapper {
  @Mapping(
    target ="product" , ignore =true
  )
  Inventory toInventory(CreateInventoryRequest inventoryRequest);
  InventoryResponse toInventoryResponse(Inventory inventory);
  InventoryResponse toInventoryResponse(CreateInventoryRequest inventoryRequest);


}
