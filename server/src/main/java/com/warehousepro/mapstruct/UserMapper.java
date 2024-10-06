package com.warehousepro.mapstruct;


import com.warehousepro.dto.response.UserResponse;
import com.warehousepro.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse toUserResponse(User user);


}
