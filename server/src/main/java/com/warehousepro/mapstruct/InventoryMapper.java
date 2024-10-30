package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.inventory.InventoryRequest;
import com.warehousepro.dto.response.inventory.InventoryResponse;
import com.warehousepro.entity.Inventory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface InventoryMapper {
  @Mapping(target = "id" , ignore = true)
  Inventory toInventory(InventoryRequest inventoryRequest);

  InventoryResponse toInventoryResponse(Inventory inventory);
}
