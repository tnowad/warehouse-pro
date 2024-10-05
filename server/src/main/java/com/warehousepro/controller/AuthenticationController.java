package com.warehousepro.controller;

import com.warehousepro.dto.request.LoginRequest;
import com.warehousepro.dto.response.ApiResponse;
import com.warehousepro.dto.response.LoginResponse;
import com.warehousepro.service.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {

    AuthenticationService authenticationService;


    @PostMapping("/login")
    public ApiResponse<LoginResponse> authenticate(@RequestBody LoginRequest request){
        var user = authenticationService.authenticate(request);
        return ApiResponse.<LoginResponse>builder()
                .result(user)
                .build();
    }

}
