package com.warehousepro.dto.request.product;

import java.util.List;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ListProductRequest {
  int page = 1;
  int pageSize = 10;
  String sort;
  String query;
  List<String> ids;
  String name;
}
