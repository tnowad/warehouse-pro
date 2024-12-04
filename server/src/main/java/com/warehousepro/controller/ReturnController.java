package com.warehousepro.controller;

import com.warehousepro.dto.request.returns.CreateBulkReturnRequest;
import com.warehousepro.dto.request.returns.CreateReturnRequest;
import com.warehousepro.dto.request.returns.ListReturnRequest;
import com.warehousepro.dto.response.ItemResponse;
import com.warehousepro.dto.response.returns.ReturnResponse;
import com.warehousepro.generator.OrderExcelUtility;
import com.warehousepro.service.ReturnService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping("/returns")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReturnController {
  ReturnService returnService;

  @PostMapping
  public ResponseEntity<ReturnResponse> create(@RequestBody CreateReturnRequest request) {
    return ResponseEntity.ok(returnService.create(request));
  }

  @PostMapping("/bulk")
  public ResponseEntity<ItemResponse<ReturnResponse>> createBulk(
      @RequestBody CreateBulkReturnRequest request) {
    return ResponseEntity.ok(returnService.createBulk(request));
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

  @PostMapping("/excel/upload")
  public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
    String message = "";
    if (OrderExcelUtility.hasExcelFormat(file)) {
      try {
        returnService.save(file);
        message = "The Excel file is uploaded: " + file.getOriginalFilename();
        return ResponseEntity.status(HttpStatus.OK).body(message);
      } catch (Exception exp) {
        message = "The Excel file is not upload: " + file.getOriginalFilename() + "!";
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
      }
    }
    message = "Please upload an excel file!";
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
  }
}
