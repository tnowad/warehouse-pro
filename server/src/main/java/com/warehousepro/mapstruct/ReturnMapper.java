package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.returns.CreateReturnRequest;
import com.warehousepro.dto.response.returns.ReturnResponse;
import com.warehousepro.entity.Return;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReturnMapper {
  Return toReturn(CreateReturnRequest request);

  @Mapping(target = "orderItemId", source = "orderItem.id")
  ReturnResponse toReturnResponse(Return returns);
}
