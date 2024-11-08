package com.warehousepro.controller;

import com.warehousepro.dto.request.returns.CreateReturnRequest;
import com.warehousepro.dto.response.returns.ReturnResponse;
import com.warehousepro.entity.Return;
import com.warehousepro.mapstruct.ReturnMapper;
import com.warehousepro.service.ReturnService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/returns")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReturnController {
  ReturnService returnService;
  ReturnMapper returnMapper;

  @PostMapping
  public ResponseEntity<ReturnResponse> create(@RequestBody CreateReturnRequest request){
    return ResponseEntity.ok(returnMapper.toReturnResponse(returnService.create(request)));
  }

  @GetMapping
  public ResponseEntity<List<Return>> getAll(){
    return ResponseEntity.ok(returnService.getAll());
  }
}
