package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.returns.CreateReturnRequest;
import com.warehousepro.dto.response.returns.ReturnResponse;
import com.warehousepro.entity.Return;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReturnMapper {
  Return toReturn(CreateReturnRequest request);
  ReturnResponse toReturnResponse(Return returns);
}
