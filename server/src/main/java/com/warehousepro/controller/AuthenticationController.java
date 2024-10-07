package com.warehousepro.controller;

import com.warehousepro.dto.request.LoginRequest;
import com.warehousepro.dto.response.ApiResponse;
import com.warehousepro.dto.response.LoginResponse;
import com.warehousepro.mapstruct.UserMapper;
import com.warehousepro.service.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {

    AuthenticationService authenticationService;
    UserMapper userMapper;

    @PostMapping("/login")
    public LoginResponse authenticate(@RequestBody LoginRequest request){
        var user = authenticationService.authenticate(request);
        return LoginResponse.builder()
                .token("jwt")
                .user(userMapper.toUserResponse(user))
                .build();
    }



}
