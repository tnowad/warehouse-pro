package com.warehousepro.service;

import com.warehousepro.dto.request.warehouse.CreateWareHouseRequest;
import com.warehousepro.dto.request.warehouse.UpdateWarehouseRequestDto;
import com.warehousepro.entity.Warehouse;
import com.warehousepro.mapstruct.WareHouseMapper;
import com.warehousepro.repository.WareHouseRepository;
import com.warehousepro.specification.WareHouseSpecification;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WarehouseService {

  WareHouseRepository warehouseRepository;

  WareHouseMapper warehouseMapper;

  WareHouseSpecification wareHouseSpecification;

  @PreAuthorize("hasRole('ROLE_Admin')")
  public Page<Warehouse> filterWarehouses(int limit, int offset, Map<String, String> filterBy,
      String sortBy, String orderBy) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    System.out.println(authentication.getAuthorities());

    Integer capacity = null;
    Integer managerId = null;
    LocalDate createdAt = null;
    LocalDate updatedAt = null;
    if (filterBy.get("capacity") != null) {
      capacity = Integer.parseInt(filterBy.get("capacity"));
    }
    if (filterBy.get("managerId") != null) {
      managerId = Integer.parseInt(filterBy.get("managerId"));
    }
    if (filterBy.get("createdAt") != null) {
      createdAt = LocalDate.parse(filterBy.get("createdAt"));
    }
    if (filterBy.get("updatedAt") != null) {
      updatedAt = LocalDate.parse(filterBy.get("updatedAt"));
    }

    Specification<Warehouse> spec =
        Specification.where(wareHouseSpecification.hasName(filterBy.get("name")))
            .and(wareHouseSpecification.hasLocation(filterBy.get("location")))
            .and(wareHouseSpecification.hasCapacityGreaterThanOrEqual(capacity))
            .and(wareHouseSpecification.hasManagerId(managerId))
            .and(wareHouseSpecification.onCreatedAt(createdAt))
            .and(wareHouseSpecification.onUpdatedAt(updatedAt));

    Pageable pageable;
    if (sortBy != null) {
      Sort sort = Sort
          .by(orderBy.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
      pageable = PageRequest.of(offset / limit, limit, sort);
    } else {
      pageable = PageRequest.of(offset / limit, limit);
    }

    return warehouseRepository.findAll(spec, pageable);
  }

  public Warehouse getWareHouse(String id) {
    return warehouseRepository.findById(id).orElseThrow(); // not supported Exception
  }

  public Warehouse createWareHouse(CreateWareHouseRequest warehouseRequest) {
    return warehouseRepository.save(warehouseMapper.toWarehouse(warehouseRequest));
  }

  public Warehouse updateWareHouse(String id, UpdateWarehouseRequestDto wareHouseUpdateRequestDto) {
    Warehouse wareHouse = getWareHouse(id);

    warehouseMapper.updateWarehouse(wareHouse, wareHouseUpdateRequestDto);

    return warehouseRepository.save(wareHouse);
  }

  public void deleteWareHouse(String id) {
    warehouseRepository.deleteById(id);
  }
}
