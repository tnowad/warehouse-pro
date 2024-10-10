package com.warehousepro.exception;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class GlobalException {


    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity handlingValidation(MethodArgumentNotValidException exception){
       var errorMessage = exception.getFieldError().getDefaultMessage();
       return  ResponseEntity.badRequest().body(errorMessage);
    }

}
