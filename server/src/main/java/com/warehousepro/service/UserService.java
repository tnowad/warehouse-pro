package com.warehousepro.service;

import com.warehousepro.dto.request.UserRequest;
import com.warehousepro.dto.response.UserResponse;
import com.warehousepro.entity.User;
import com.warehousepro.mapstruct.UserMapper;
import com.warehousepro.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;



@Service
@FieldDefaults(level = AccessLevel.PRIVATE , makeFinal = true)
@RequiredArgsConstructor
public class UserService {

    UserRepository userRepository;
    UserMapper userMapper;

    public UserResponse createUser(UserRequest request){

        User user = userMapper.toUser(request);

        userRepository.save(user);

        return userMapper.toUserResponse(user);
    }

    public UserResponse getUser(String id){
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy id"));
        return userMapper.toUserResponse(user);
    }

}
