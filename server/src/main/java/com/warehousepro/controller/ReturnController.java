package com.warehousepro.controller;

import com.warehousepro.dto.request.returns.CreateReturnRequest;
import com.warehousepro.dto.request.returns.ListReturnRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.returns.ReturnResponse;
import com.warehousepro.mapstruct.ReturnMapper;
import com.warehousepro.service.ReturnService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/returns")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReturnController {
  ReturnService returnService;
  ReturnMapper returnMapper;

  @PostMapping
  public ResponseEntity<ReturnResponse> create(@RequestBody CreateReturnRequest request) {
    return ResponseEntity.ok(returnMapper.toReturnResponse(returnService.create(request)));
  }

  @GetMapping
  public ResponseEntity<ItemResponse<ReturnResponse>> getAll(
      @ModelAttribute ListReturnRequest request) {
    return ResponseEntity.ok(returnService.getAll(request));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> delete(@PathVariable("id") String id) {
    returnService.delete(id);
    return ResponseEntity.ok("xóa thành công");
  }
}
