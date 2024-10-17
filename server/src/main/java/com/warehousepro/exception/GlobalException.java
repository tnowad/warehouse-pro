package com.warehousepro.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
public class GlobalException {

  @ExceptionHandler(Exception.class)
  public ResponseEntity<?> handleAllExceptions(Exception ex, WebRequest request) {
    log.error("Exception occurred: {}, Request Details: {}", ex.getMessage(),
        request.getDescription(false), ex);
    return ResponseEntity.internalServerError().body("Internal Server Error");
  }

  @ExceptionHandler(value = MethodArgumentNotValidException.class)
  ResponseEntity<?> handlingValidation(MethodArgumentNotValidException exception) {
    var errorMessage = exception.getFieldError().getDefaultMessage();
    return ResponseEntity.badRequest().body(errorMessage);
  }
}
