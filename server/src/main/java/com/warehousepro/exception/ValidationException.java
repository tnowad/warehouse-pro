package com.warehousepro.exception;

import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ValidationException extends RuntimeException {
  Map<String, List<String>> errors;
  String message;
}
