package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.auth.CreateUserRequest;
import com.warehousepro.dto.response.auth.UserResponse;
import com.warehousepro.dto.response.role.GetUserRolesItemResponse;
import com.warehousepro.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

  UserResponse toUserResponse(User user);

  @Mapping(target = "roles", ignore = true)
  @Mapping(target = "id", ignore = true)
  User toUser(CreateUserRequest request);

}
