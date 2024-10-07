package com.warehousepro.controller;

import com.warehousepro.dto.request.UserRequest;
import com.warehousepro.dto.response.UserResponse;
import com.warehousepro.mapstruct.UserMapper;
import com.warehousepro.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {

    UserService userService;
    UserMapper userMapper;

    @PostMapping
    UserResponse create(@RequestBody UserRequest request){
        var user =  userService.createUser(request);
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }


    @GetMapping("/{userId}")
    UserResponse getUser(@PathVariable String userId){
        var user = userService.getUser(userId);
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

}
