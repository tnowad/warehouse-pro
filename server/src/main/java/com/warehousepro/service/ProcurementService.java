package com.warehousepro.service;

import com.warehousepro.dto.request.procurement.CreateProcurementRequest;
import com.warehousepro.entity.Procurement;
import com.warehousepro.mapstruct.ProcurementMapper;
import com.warehousepro.repository.ProcurementRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ProcurementService {
  ProcurementRepository procurementRepository;
  ProcurementMapper procurementMapper;

  @Transactional
  public Procurement create(CreateProcurementRequest request) {
    Procurement procurement = procurementMapper.toProcurement(request);
    procurementRepository.save(procurement);
    return procurement;
  }
}
