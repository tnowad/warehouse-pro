package com.warehousepro.mapstruct;

import com.warehousepro.dto.request.product.CreateProductRequest;
import com.warehousepro.dto.response.product.ProductResponse;
import com.warehousepro.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring")
public interface ProductMapper {
  @Mapping(target = "id", ignore = true)
  Product toProduct(CreateProductRequest request);

  ProductResponse toProductResponse(Product product);


}
