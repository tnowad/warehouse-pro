package com.warehousepro.controller;

import com.warehousepro.dto.request.warehouse.CreateWareHouseRequest;
import com.warehousepro.dto.request.warehouse.UpdateWarehouseRequestDto;
import com.warehousepro.dto.response.Metadata;
import com.warehousepro.dto.response.PaginatedResponse;
import com.warehousepro.dto.response.Pagination;
import com.warehousepro.dto.response.SortField;
import com.warehousepro.dto.response.warehouse.*;
import com.warehousepro.mapstruct.WareHouseMapper;
import com.warehousepro.service.WarehouseService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/warehouses")
public class WarehouseController {

  WarehouseService warehouseService;

  WareHouseMapper warehouseMapper;

  @GetMapping
  public PaginatedResponse<WareHouseResponseDto> getAllWarehouse(
      @RequestParam(defaultValue = "25") int limit, @RequestParam(defaultValue = "1") int offset,
      @RequestParam(required = false) String sortBy, @RequestParam(required = false) String orderBy,
      @RequestParam(required = false) Map<String, String> filtersBy) {
    Map<String, String> filteredMap = filtersBy.entrySet().stream()
        .filter(entry -> !entry.getKey().equals("limit") && !entry.getKey().equals("offset")
            && !entry.getKey().equals("sortBy") && !entry.getKey().equals("orderBy"))
        .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

    var page = warehouseService.filterWarehouses(limit, offset, filtersBy, sortBy, orderBy);

    List<WareHouseResponseDto> items =
        page.stream().map(warehouseMapper::toWarehouseResponse).toList();
    int totalCount = (int) page.getTotalElements();
    int totalPageCount = (int) Math.ceil((double) totalCount / limit);
    Pagination pagination = new Pagination(offset, limit, Math.max(offset - limit, 0),
        Math.min(offset + limit, totalCount), offset / limit + 1, totalPageCount, totalCount);

    Metadata metadata = Metadata.builder().pagination(pagination)
        .sortedBy(new SortField(sortBy, orderBy)).filterBy(filteredMap).build();

    return new PaginatedResponse<>(items, metadata);
  }

  @GetMapping("/{id}")
  public WareHouseResponseDto getWarehouse(@PathVariable("id") String id) {
    return warehouseMapper.toWarehouseResponse(warehouseService.getWareHouse(id));
  }

  @PostMapping
  public WareHouseResponseDto createWarehouse(
      @RequestBody CreateWareHouseRequest warehouseRequest) {
    return warehouseMapper.toWarehouseResponse(warehouseService.createWareHouse(warehouseRequest));
  }

  @PutMapping("/{id}")
  public WareHouseResponseDto updateWarehouse(@PathVariable("id") String id,
      @RequestBody UpdateWarehouseRequestDto warehouseRequest) {
    return warehouseMapper
        .toWarehouseResponse(warehouseService.updateWareHouse(id, warehouseRequest));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteWarehouse(@PathVariable("id") String id) {
    // TODO: Soft delete: Set `deleted_at` field to current date
    warehouseService.deleteWareHouse(id);
    // FIXME: Should return content instead of no content because this is a soft
    // delete operation
    return ResponseEntity.noContent().build();
  }

  @DeleteMapping("/{id}/hard-delete")
  public ResponseEntity<Void> hardDeleteWarehouse(@PathVariable("id") String id) {
    // TODO: Hard delete: Remove the record from the database
    throw new UnsupportedOperationException("Not implemented yet");
  }

  @PutMapping("/{id}/restore")
  public ResponseEntity<Void> restoreWarehouse(@PathVariable("id") String id) {
    // TODO: Restore: Set `deleted_at` field to null
    throw new UnsupportedOperationException("Not implemented yet");
  }

  // TODO: Bulk soft delete and bulk hard delete
}
