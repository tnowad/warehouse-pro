package com.warehousepro.service;

import com.warehousepro.dto.request.returns.CreateReturnRequest;
import com.warehousepro.entity.Return;
import com.warehousepro.mapstruct.ReturnMapper;
import com.warehousepro.repository.ReturnRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ReturnService {
  ReturnRepository repository;
  ReturnMapper mapper;

  @Transactional
  public Return create(CreateReturnRequest request){
    Return returns = mapper.toReturn(request);
    repository.save(returns);
    return returns;
  }

  public List<Return> getAll(){
    return repository.findAll();
  }
}
