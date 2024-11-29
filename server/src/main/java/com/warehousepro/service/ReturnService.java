package com.warehousepro.service;

import com.warehousepro.dto.request.returns.CreateReturnRequest;
import com.warehousepro.dto.request.returns.ListReturnRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.returns.ReturnResponse;
import com.warehousepro.entity.Order;
import com.warehousepro.entity.Return;
import com.warehousepro.generator.OrderExcelUtility;
import com.warehousepro.mapstruct.ReturnMapper;
import com.warehousepro.repository.OrderRepository;
import com.warehousepro.repository.ReturnRepository;
import com.warehousepro.specification.ReturnSpecification;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ReturnService {
  private final ReturnMapper returnMapper;
  ReturnRepository repository;
  ReturnMapper mapper;
  ReturnSpecification specification;
  OrderRepository orderRepository;

  @Transactional
  public Return create(CreateReturnRequest request) {
    Return returns = mapper.toReturn(request);
    repository.save(returns);
    return returns;
  }

  public ItemResponse<ReturnResponse> getAll(ListReturnRequest filterRequest) {
    var spec = specification.getFilterSpecification(filterRequest);
    var pageRequest = PageRequest.of(filterRequest.getPage() - 1, filterRequest.getPageSize());
    var totalItems = repository.count(spec);
    var returns = repository.findAll(spec, pageRequest);
    var page = filterRequest.getPage();
    var pageCount = (int) Math.ceil((double) totalItems / filterRequest.getPageSize());

    return ItemResponse.<ReturnResponse>builder()
        .items(returns.stream().map(returnMapper::toReturnResponse).collect(Collectors.toList()))
        .rowCount(Integer.valueOf(totalItems + ""))
        .page(page)
        .pageCount(pageCount)
        .build();
  }

  public void save(MultipartFile file) {
    try {
      List<Order> orderList = OrderExcelUtility.excelToOrderList(file.getInputStream());
      log.info("chào");
      orderRepository.saveAll(orderList);
    } catch (IOException ex) {
      throw new RuntimeException("Excel data is failed to store: " + ex.getMessage());
    }
  }

  @Transactional
  public void delete(String id) {
    repository.deleteById(id);
  }
}
