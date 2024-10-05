package com.warehousepro.service;

import com.warehousepro.dto.request.LoginRequest;
import com.warehousepro.dto.response.ApiResponse;
import com.warehousepro.dto.response.LoginResponse;
import com.warehousepro.entity.User;
import com.warehousepro.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE , makeFinal = true)
public class AuthenticationService {

    UserRepository userRepository;

    public LoginResponse authenticate(LoginRequest loginRequest){
       userRepository.findByUsername(loginRequest.getUsername()).orElseThrow(
                RuntimeException::new);

        return LoginResponse.builder()
                .token("Thành công")
                .authentication(true)
                .build();

    }

}
