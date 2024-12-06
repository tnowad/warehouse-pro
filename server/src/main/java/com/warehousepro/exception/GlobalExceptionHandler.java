package com.warehousepro.exception;

import com.warehousepro.dto.response.error.ErrorResponse;
import com.warehousepro.dto.response.error.ValidationErrorResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
    log.error("An error occurred", ex);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new ErrorResponse(ex.getMessage()));
  }

  @ExceptionHandler(ValidationException.class)
  public ResponseEntity<ValidationErrorResponse> handleValidationException(ValidationException ex) {
    ValidationErrorResponse response = new ValidationErrorResponse(ex.getMessage(), ex.getErrors());
    return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(response);
  }

  @ExceptionHandler(EmailNotFoundException.class)
  public ResponseEntity<ValidationErrorResponse> handleEmailNotFoundException(
      EmailNotFoundException ex) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(
            new ValidationErrorResponse(
                ex.getMessage(), Map.of("email", List.of("User not found"))));
  }

  @ExceptionHandler(IncorrectPasswordException.class)
  public ResponseEntity<ValidationErrorResponse> handleIncorrectPasswordException(
      IncorrectPasswordException ex) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(
            new ValidationErrorResponse(
                ex.getMessage(), Map.of("password", List.of("Incorrect password"))));
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ValidationErrorResponse> handleMethodArgumentNotValidException(
      MethodArgumentNotValidException ex) {
    String message = "Validation failed";
    Map<String, List<String>> errors = new HashMap<>();
    ex.getBindingResult()
        .getFieldErrors()
        .forEach(
            error ->
                errors
                    .computeIfAbsent(error.getField(), key -> List.of())
                    .add(error.getDefaultMessage()));
    ValidationErrorResponse response = new ValidationErrorResponse(message, errors);
    return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(response);
  }

  @ExceptionHandler(OAuth2AuthenticationException.class)
  public ResponseEntity<Object> handleOAuth2AuthenticationException(
      OAuth2AuthenticationException ex) {
    log.error("OAuth2 Authentication error: {}", ex.getMessage(), ex);
    Map<String, String> response = new HashMap<>();
    response.put("error", "Unauthorized");
    response.put("message", ex.getMessage());
    return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler(AuthenticationException.class)
  public ResponseEntity<Object> handleAuthenticationException(AuthenticationException ex) {
    log.error("Authentication error: {}", ex.getMessage(), ex);
    Map<String, String> response = new HashMap<>();
    response.put("error", "Unauthorized");
    response.put("message", ex.getMessage());
    return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler(BindException.class)
  public ResponseEntity<Object> handleBindException(BindException ex) {
    log.warn("Binding error: {}", ex.getMessage(), ex);
    Map<String, String> response = new HashMap<>();
    ex.getBindingResult()
        .getFieldErrors()
        .forEach(
            error -> {
              response.put(error.getField(), error.getDefaultMessage());
            });
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<Object> handleException(Exception ex) {
    log.error("Internal server error: {}", ex.getMessage(), ex);
    Map<String, String> response = new HashMap<>();
    response.put("error", "Internal Server Error");
    response.put("message", ex.getMessage());
    return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
