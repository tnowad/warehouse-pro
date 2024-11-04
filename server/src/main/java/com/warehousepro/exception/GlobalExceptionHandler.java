package com.warehousepro.exception;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import com.warehousepro.dto.response.error.ErrorResponse;
import com.warehousepro.dto.response.error.ValidationErrorResponse;
import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
    log.error("An error occurred", ex);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new ErrorResponse("An error occurred. Please try again later"));
  }

  @ExceptionHandler(ValidationException.class)
  public ResponseEntity<ValidationErrorResponse> handleValidationException(ValidationException ex) {
    ValidationErrorResponse response = new ValidationErrorResponse(ex.getMessage(), ex.getErrors());
    return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(response);
  }

  @ExceptionHandler(EmailNotFoundException.class)
  public ResponseEntity<ValidationErrorResponse> handleEmailNotFoundException(
      EmailNotFoundException ex) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
        new ValidationErrorResponse(ex.getMessage(), Map.of("email", List.of("User not found"))));
  }

  @ExceptionHandler(IncorrectPasswordException.class)
  public ResponseEntity<ValidationErrorResponse> handleIncorrectPasswordException(
      IncorrectPasswordException ex) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ValidationErrorResponse(
        ex.getMessage(), Map.of("password", List.of("Incorrect password"))));
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ValidationErrorResponse> handleMethodArgumentNotValidException(
      MethodArgumentNotValidException ex) {
    String message = "Validation failed";
    Map<String, List<String>> errors = new HashMap<>();
    ex.getBindingResult().getFieldErrors().forEach(error -> errors
        .computeIfAbsent(error.getField(), key -> List.of()).add(error.getDefaultMessage()));
    ValidationErrorResponse response = new ValidationErrorResponse(message, errors);
    return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(response);
  }

  @ExceptionHandler(Exception.class)
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  public ResponseEntity<ErrorResponse> handleException(Exception ex) {
    log.error("An error occurred", ex);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new ErrorResponse("An error occurred. Please try again later"));
  }
}
